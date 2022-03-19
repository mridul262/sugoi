/* eslint-disable react/state-in-constructor */
// Basic Imports
import React from 'react';
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';


/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import CampaignList from '../../containers/BrandCampaignListPage/CampaignListTable';
import CTAButton from '../../components/CTAButton';
import TabsWrapper from '../../components/TabsWrapper';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';

const BrandCampaignPage = () => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};
	return (
		<>
			<main className="page-container">
				<PageHeader
					title="Dashboard"
					breadcrumb={[
						{ content: 'Home', to: '/brand' },
						{ content: 'Campaigns' }
					]}
					callToAction=""
				/>
				<div className={styles.campaignPageHeaderRow}>
					<h2 className={styles.pageTitle}> Campaigns </h2>
					<div className={styles.buttonsRow}>
						<CTAButton
							colorScheme="brand"
							type="secondary"
							size="tiny"
							to="/brand/campaigns/new"
							disabled
						>
							<i className="bx bxs-download"></i>
							Export
						</CTAButton>

						<CTAButton
							colorScheme="brand"
							type="primary"
							size="tiny"
							to="/brand/campaigns/new"
						>
							<i className="bx bx-plus"></i>
							Create New
						</CTAButton>
					</div>
				</div>
				<TabsWrapper
					handleTabChange={handleTabChange}
					selectedTab={selectedTabList}
					tabsDisplayList={['All', 'Current']}
				>
					<TabPanel>
						<CampaignList campaigns={campaigns} />
					</TabPanel>

					<TabPanel>
						<CampaignList campaigns={campaigns} />
					</TabPanel>
				</TabsWrapper>
			</main>
		</>
	);
};

export default BrandCampaignPage;
