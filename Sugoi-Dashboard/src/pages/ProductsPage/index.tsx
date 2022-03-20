/* eslint-disable react/state-in-constructor */
// Basic Imports
import React, {useEffect} from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';


/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import ProductsTable from '../../containers/ProductsPage/ProductsTable';
import CTAButton from '../../components/CTAButton';
import TabsWrapper from '../../components/TabsWrapper';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';

axios.defaults.baseURL = 'https://cuboid-backend.herokuapp.com'
const ProductsPage = () => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const [userData, setUserData] = React.useState<any>();
	useEffect(() => {
		axios.get('/products').then((res) => {setUserData(res); console.log(userData)}).catch((err)=> {console.log(err)})
		console.log(userData)
	  }, []);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};
	return (
		<>
			<main className="page-container">
				<PageHeader
					title="Products"
					breadcrumb={[
						{ content: 'Home', to: '/products' },
						{ content: 'Products' }
					]}
					callToAction=""
				/>
				<div className={styles.campaignPageHeaderRow}>
					<h2 className={styles.pageTitle}> Products </h2>
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
					{userData?.data && (<TabPanel>
						<ProductsTable campaigns={userData.data} />
					</TabPanel>)}

					{userData?.data && <TabPanel>
						<ProductsTable campaigns={userData.data} />
					</TabPanel>}
				</TabsWrapper>
			</main>
		</>
	);
};

export default ProductsPage;
