import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as ENV_VARIABLES from '../../config';
import { updateObject } from '../utility';

const { BACKEND } = ENV_VARIABLES;
/**
 *
 * Sends an action to reducer to change hello world to true.
 * @memberof ReduxAction
 */
export const helloWorld = (text) => {
	return {
		type: actionTypes.HELLO_WORLD,
		helloWorld: text
	};
};

// Creator auth actions -----------------------------------------------------------------
export const creatorAuthStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const creatorRegister = (
	name,
	gender,
	tiktokHandle,
	emailAddress,
	password,
	dob
) => {
	return async (dispatch) => {
		dispatch(creatorAuthStart);
		const registrationDetails = {
			name,
			gender,
			tiktokHandle,
			emailAddress,
			password,
			dob
		};

		try {
			const registrationResponse = await axios.post(
				`${BACKEND}/creator/auth/register`,
				registrationDetails
			);
			const creatorToken = registrationResponse.data.jwt;
			const creatorTiktokId = registrationResponse.data.tiktokId;
			if (registrationResponse.status === 200) {
				dispatch({
					type: actionTypes.CREATOR_AUTH_SUCCESS,
					creatorIsAuthenticated: true,
					creatorToken,
					creatorTiktokId
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: registrationResponse.data.msg
				});
			}
		} catch (err) {
			if (err.response) {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: err.response.data.msg
				});
			}
		}
	};
};

export const creatorLogin = (tiktokHandle, password) => {
	return async (dispatch) => {
		dispatch(creatorAuthStart);
		const loginDetails = {
			tiktokHandle,
			password
		};

		try {
			const registrationResponse = await axios.post(
				`${BACKEND}/creator/auth/login`,
				loginDetails
			);
			const creatorToken = registrationResponse.data.jwt;
			const creatorTiktokId = registrationResponse.data.tiktokId;
			if (registrationResponse.status === 200) {
				dispatch({
					type: actionTypes.CREATOR_AUTH_SUCCESS,
					creatorIsAuthenticated: true,
					creatorToken,
					creatorTiktokId
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: registrationResponse.data.msg
				});
			}
		} catch (err) {
			if (err.response) {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: err.response.data.msg
				});
			} else {
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: 'Server error.'
				});
			}
		}
	};
};

export const creatorLogout = () => {
	return {
		type: actionTypes.CREATOR_AUTH_LOGOUT
	};
};

export const creatorAuthVerify = (creatorToken) => {
	return async (dispatch) => {
		try {
			const verifyResponse = await axios.get(`${BACKEND}/creator/auth/getId`, {
				headers: {
					'jwt-token': creatorToken
				}
			});

			if (verifyResponse.status === 200) {
				dispatch({
					type: actionTypes.CREATOR_AUTH_SUCCESS,
					creatorToken,
					creatorTiktokId: verifyResponse.data.tiktokId
				});
			} else {
				// This shouldnt even occur.
				dispatch({
					type: actionTypes.AUTH_FAILURE,
					errorMessage: ''
				});
			}
		} catch (err) {
			dispatch({
				type: actionTypes.AUTH_FAILURE,
				errorMessage: ''
			});
		}
	};
};

// Creator Profile Actions --------------------------------
export const creatorProfileGetInfo = (creatorToken) => {
	return async (dispatch) => {
		try {
			const creatorInfo = await axios.get(
				`${BACKEND}/creator/profile/getCreatorInfo`,
				{
					headers: {
						'jwt-token': creatorToken
					}
				}
			);
			if (creatorInfo.status === 400) {
				console.log(`Reponse 400: ${creatorInfo.data}`);
				return;
			}

			const tiktokId = { tiktokId: creatorInfo.data.tiktok_id };
			const metadata = await axios.post(
				`${BACKEND}/global/getTiktokMetadata`,
				tiktokId
			);
			if (metadata.status === 400) {
				console.log(`Reponse 400: ${metadata.data}`);
				return;
			}
			const tiktokHandle = metadata.data.tiktok_handle;
			const avatar = metadata.data.avatar_larger_url;

			dispatch({
				type: actionTypes.CREATOR_GET_PROFILE_INFO,
				newInfo: {
					avatar,
					name: creatorInfo.data.name,
					dob: creatorInfo.data.date_of_birth,
					gender: creatorInfo.data.gender,
					tiktokHandle,
					email: creatorInfo.data.email_address,
					country: creatorInfo.data.country,
					ethnicity: creatorInfo.data.ethnicity,
					maritalStatus: creatorInfo.data.marital_status,
					occupation: creatorInfo.data.occupation
				}
			});
		} catch (err) {
			console.log(err.message);
		}
	};
};

export const creatorProfileUpdateInfo = (creatorToken, newInfo, tiktokId) => {
	return async (dispatch) => {
		const creatorInfo = updateObject(newInfo, { tiktokId });

		try {
			const response = await axios.post(
				`${BACKEND}/creator/profile/updateProfileInfo`,
				creatorInfo,
				{
					headers: {
						'jwt-token': creatorToken
					}
				}
			);
			if (response.data.success) {
				dispatch({
					type: actionTypes.CREATOR_UPDATE_PROFILE_INFO,
					newInfo
				});
			} else {
				console.log(response.data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
};
