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
import ModalAnimatedPopup from '../../components/ModalAnimatedPopup';
import InputForm from '../../components/InputForm';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';

axios.defaults.baseURL = 'https://cuboid-backend.herokuapp.com'
const ProductsPage = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [createNewProduct, setCreateNewProduct] = React.useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
	const [productName, setProductName] = React.useState<string>('');
	const [price, setPrice] = React.useState<string>('');
	const [currency, setCurrency] = React.useState<string>('');
	const [units, setUnits] = React.useState<string>('');
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const [userData, setUserData] = React.useState<any>();
	const getProducts = async () => {
		setIsLoading(true);
		await axios.get('/products').then((res) => {setUserData(res); console.log(userData)}).catch((err)=> {console.log(err)})
		setIsLoading(false);
	}
	useEffect(() => {
		getProducts();
	  }, []);
	
	const handleSubmit = async () => {
		setSubmitLoading(true);
		const res = await axios.post('https://cuboid-backend.herokuapp.com/products/create_product', {
			product_name: productName,
			units: units,
			val: price,
			currency_name: 'CELO',
			merchant_id: 3
		})
		setCreateNewProduct(false)
		setPrice('')
		setProductName('')
		setUnits('')
		axios.get('/products').then((res) => {setUserData(res); console.log(userData)}).catch((err)=> {console.log(err)})
		setTimeout(() => {
			setSubmitLoading(false)
		}, 2000)
	}
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
							onClick={() => setCreateNewProduct(true)}
						>
							<i className="bx bx-plus"></i>
							Create New
						</CTAButton>
					</div>
				</div>
				<TabsWrapper
					handleTabChange={handleTabChange}
					selectedTab={selectedTabList}
					tabsDisplayList={['All']}
				>
					{userData?.data && (<TabPanel>
						<ProductsTable campaigns={userData.data} loading={isLoading}/>
					</TabPanel>)}
				</TabsWrapper>
			</main>

			<ModalAnimatedPopup
				isOpen={createNewProduct}
				setOpen={setCreateNewProduct}
			>
				<div className={styles.createNewProduct}>
					<h2> Create New Product </h2>
					<p>
						Create a new product and add it to your inventory.
					</p>

					<InputForm
						className={styles.input}
						id="productName"
						label="Product Name"
						type="text"
						name="productName"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>

					<InputForm
						className={styles.input}
						id="units"
						label="Units"
						type="text"
						name="units"
						value={units}
						onChange={(e) => setUnits((e.target.value))}
					/>

					<InputForm
						className={styles.input}
						id="price"
						label="Price"
						type="text"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				
					<InputForm
						className={styles.disabled}
						id="currency"
						label="Currency"
						type="text"
						name="currency"
						value={'CELO'}
						onChange={(e) => setCurrency(e.target.value)}
					/>
					<br/>
					<CTAButton
						colorScheme="brand"
						type="primary"
						size="medium"
						onClick={handleSubmit}
						className={styles.cta}
						loading={submitLoading}
					>
						Create
					</CTAButton>
				</div>
			</ModalAnimatedPopup>
		</>
	);
};

export default ProductsPage;
