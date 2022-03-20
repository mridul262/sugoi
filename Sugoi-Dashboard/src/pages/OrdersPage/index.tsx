/* eslint-disable react/state-in-constructor */
// Basic Imports
import React from 'react';
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';


/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import OrdersTable from '../../containers/OrdersPage/OrdersTable';
import CTAButton from '../../components/CTAButton';
import TabsWrapper from '../../components/TabsWrapper';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';

const OrdersPage = () => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};
	return (
		<>
			<main className="page-container">
				<PageHeader
					title="Orders"
					breadcrumb={[
						{ content: 'Home', to: '/orders' },
						{ content: 'Orders' }
					]}
					callToAction=""
				/>
				<div className={styles.campaignPageHeaderRow}>
					<h2 className={styles.pageTitle}> Orders </h2>
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
					tabsDisplayList={['Active Orders', 'Closed Orders', 'Disputed Orders']}
				>
					<TabPanel>
						<OrdersTable campaigns={campaigns} />
					</TabPanel>
					
					<TabPanel>
						<OrdersTable campaigns={campaigns} />
					</TabPanel>

					<TabPanel>
						<OrdersTable campaigns={campaigns} />
					</TabPanel>
				</TabsWrapper>
			</main>
		</>
	);
};

export default OrdersPage;
