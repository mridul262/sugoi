/* eslint-disable no-alert */
import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as ENV_VARIABLES from '../../config';

const { BACKEND } = ENV_VARIABLES;

// Brand auth actions -----------------------------------------------------------------
export const brandAuthStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authFailure = (error) => {
	return {
		type: actionTypes.AUTH_FAILURE,
		errorMessage: error
	};
};

export const brandRegister = (
	brandName,
	brandWebsite,
	brandEmail,
	brandPassword,
	accountManagerName
) => {
	return async (dispatch) => {
		dispatch(brandAuthStart);
		const registrationDetails = {
			brandName,
			brandWebsite,
			brandEmail,
			brandPassword,
			accountManagerName
		};

		try {
			const registrationResponse = await axios.post(
				`${BACKEND}/brand/auth/register`,
				registrationDetails
			);
			const brandToken = registrationResponse.data.jwt;
			const brandName = registrationResponse.data.brand_name;
			const brandManagerName = registrationResponse.data.account_manager_name;

			if (registrationResponse.status === 200) {
				dispatch({
					type: actionTypes.BRAND_AUTH_SUCCESS,
					brandIsAuthenticated: true,
					brandToken,
					brandName,
					brandManagerName
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: registrationResponse.data
				});
			}
		} catch (err) {
			if (err.response) {
				dispatch(authFailure(err.response.data));
			}
		}
	};
};

export const brandLogout = () => {
	return {
		type: actionTypes.BRAND_AUTH_LOGOUT
	};
};

export const brandAuthVerify = (brandToken) => {
	return async (dispatch) => {
		try {
			const verifyResponse = await axios.get(`${BACKEND}/brand/auth/getBrand`, {
				headers: {
					'jwt-token': brandToken
				}
			});
			if (verifyResponse.status === 200) {
				dispatch({
					type: actionTypes.BRAND_AUTH_SUCCESS,
					brandToken,
					brandName: verifyResponse.data.brand_name,
					brandManagerName: verifyResponse.data.account_manager_name
				});
			} else {
				// This shouldnt even occur.
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: ''
				});
			}
		} catch (err) {
			console.log(err.response);
			dispatch(brandLogout());
		}
	};
};

export const brandStartLoading = () => {
	return {
		type: actionTypes.BRAND_LOAD_START
	};
};

export const brandFailedLoading = (error) => {
	return {
		type: actionTypes.BRAND_LOAD_FAIL,
		errorMessage: error
	};
};

// -- filters: e.g. [0, 5000, 0, 0, 0]: means filter by followers_count >= 5000.
// -- [verified: 0 if no filter, 1 if true, 2 if false,
// follower_count: >= <NUMBER>, following_count: >= <NUMBER>, heart_count: >= <NUMBER>, video_count: >= <NUMBER>]
// -- sort by: e.g. sort by: [9,2] -> means sort by following count, then by nickname.
// -- [tiktok_handle (1), nickname (2), avatar_large (3), avatar_med (4), avatar_thumb (5),
// signature (6), verified (7), bio (8), followers (9), following (10), heart (11), video (12)]
export const brandGetCreators = (brandToken, offset, limit, filters, sort) => {
	return async (dispatch) => {
		dispatch(brandStartLoading);
		try {
			const arrayFilters = [0, 0, 0, 0, 0];
			filters.map((filter) => {
				if (filter === 'followersCount') {
					arrayFilters[1] = filters[filter];
				} else if (filter === 'followingCount') {
					arrayFilters[2] = filters[filter];
				} else if (filter === 'videoCount') {
					arrayFilters[4] = filters[filter];
				} else if (filter === 'verified') {
					arrayFilters[0] = filters[filter];
				}
				return 0;
			});

			const data = {
				offset,
				limit,
				filters: arrayFilters,
				sort
			};
			const creators = await axios.post(
				`${BACKEND}/brand/creators/getCreators`,
				data,
				{
					headers: {
						'jwt-token': brandToken
					}
				}
			);
			if (creators) {
				dispatch({
					type: actionTypes.BRAND_GET_CREATORS,
					brandCreatorList: creators.data.brandCreatorList,
					brandCreatorCount: creators.data.brandCreatorCount
				});
			} else {
				dispatch(brandFailedLoading('Server is currently offline'));
			}
		} catch (err) {
			dispatch(brandFailedLoading(err.response.data));

			if (err.response && err.response.status === 403) {
				alert('Your login session has expired. Please login again.');
				dispatch(brandLogout());
			}
		}
	};
};

export const brandUpdateFilters = (brandToken, filters, sort) => {
	const DEFAULT_OFFSET = 0;
	const DEFAULT_LIMIT = 20;
	return async (dispatch) => {
		dispatch(
			brandGetCreators(brandToken, DEFAULT_OFFSET, DEFAULT_LIMIT, filters, sort)
		);
		dispatch({
			type: actionTypes.BRAND_UPDATE_FILTERS,
			filters,
			sort
		});
	};
};

export const brandUpdatePage = (page) => {
	return {
		type: actionTypes.BRAND_UPDATE_PAGE,
		brandCreatorPage: page
	};
};

// Brand new campaign actions
export const brandNewCampaignUpdate = (key, value) => {
	return {
		type: actionTypes.BRAND_NEW_CAMPAIGN_UPDATE,
		newCampaignKey: key,
		newCampaignValue: value
	};
};

export const brandCreateNewCampaign = (brandToken, campaign) => {
	return async (dispatch) => {
		try {
			dispatch(brandStartLoading);
			const campaignResult = await axios.post(
				`${BACKEND}/brand/campaigns/newCampaign`,
				campaign,
				{
					headers: {
						'jwt-token': brandToken
					}
				}
			);
			if (campaignResult) {
				dispatch({
					type: actionTypes.BRAND_NEW_CAMPAIGN,
					campaign
				});
			} else {
				dispatch(brandFailedLoading('Server is currently offline'));
			}
		} catch (err) {
			dispatch(brandFailedLoading(err.response));
			if (err.response && err.response.status === 403) {
				alert('Your login session has expired. Please login again.');
				dispatch(brandLogout());
			}
		}
	};
};

export const getBrandCampaigns = (brandToken) => {
	return async (dispatch) => {
		try {
			dispatch(brandStartLoading);
			const campaigns = await axios.get(
				`${BACKEND}/brand/campaigns/getCampaigns`,
				{
					headers: {
						'jwt-token': brandToken
					}
				}
			);
			if (campaigns) {
				dispatch({
					type: actionTypes.BRAND_GET_CAMPAIGNS,
					brandCampaigns: campaigns.data.campaigns
				});
			} else {
				dispatch(brandFailedLoading('Server is currently offline'));
			}
		} catch (err) {
			dispatch(brandFailedLoading(err.response));
			if (err.response && err.response.status === 403) {
				alert('Your login session has expired. Please login again.');
				dispatch(brandLogout());
			}
		}
	};
};
