/* eslint-disable react/state-in-constructor */
// Basic Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import CustomersTable from '../../containers/Customers/CustomersTable';
import CTAButton from '../../components/CTAButton';
import TabsWrapper from '../../components/TabsWrapper';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';
import axios from 'axios';
import CustomerTable from '../../containers/Customers/CustomersTable';

const CustomerPage = (props: any) => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const [orders, setOrders] = React.useState<Array<any>>([]);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};

	useEffect(() => {
		const customerId = props.match.params.id;

		const config: any = {
			url: `https://cuboid-backend.herokuapp.com/customers/${customerId}/orders`,
			method: 'get',
		};

		axios(config).then(async (res) => {
			const fetchOrders = res.data;

			const newOrders = await Promise.all(
				fetchOrders.map(async (order: any) => {
					const newOrder = order;
					const { product_id: productId, merchant_id: merchantId } = order;

					const productConfig: any = {
						url: `https://cuboid-backend.herokuapp.com/products/${productId}`,
						method: 'get',
					};

					const res = await axios(productConfig);

					order.product = res.data;
					return newOrder;
				})
			);
			console.log(newOrders);
			setOrders(newOrders);
		});
	}, []);

	return (
		<>
			<main className='page-container'>
				<div className={styles.campaignPageHeaderRow}>
					<h2 className={styles.pageTitle}> Orders </h2>
					<div className={styles.buttonsRow}>
						<CTAButton
							colorScheme='brand'
							type='secondary'
							size='tiny'
							to='/brand/campaigns/new'
							disabled
						>
							<i className='bx bxs-download'></i>
							Export
						</CTAButton>
					</div>
				</div>
				<TabsWrapper
					handleTabChange={handleTabChange}
					selectedTab={selectedTabList}
					tabsDisplayList={['All', 'Current']}
				>
					<TabPanel>
						<CustomerTable campaigns={orders} />
					</TabPanel>

					{/* <TabPanel>
						<CustomersTable campaigns={campaigns} />
					</TabPanel> */}
				</TabsWrapper>
			</main>
		</>
	);
};

export default CustomerPage;
