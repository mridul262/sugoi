// Basic Imports
import React from 'react';
// -------------------------------------------------------------------------

// Imports needed for redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
// -------------------------------------------------------------------------

import styles from './index.module.scss';
import history from '../../utils/History';

const Nav = () => {
	const handleLogout = (e: any) => {
		e.preventDefault();
		console.log("Log out");
		history.push('/');
	};

	const handleChangePage = (newPage: string) => {
		history.push(newPage);
	};

	return (
		<section className={styles.brandNav}>
			<button
				className={`
					${styles.navOption}
					${history.location.pathname === '/' && styles.navOption_selected}
				`}
				onClick={() => handleChangePage('/')}
			>
				Home
			</button>
			<button
				className={`
					${styles.navOption}
					${history.location.pathname === '/products' && styles.navOption_selected}
				`}
				onClick={() => handleChangePage('/products')}
			>
				Products
			</button>
			<button
				className={`
					${styles.navOption}
					${history.location.pathname === '/customers' && styles.navOption_selected}
				`}
				onClick={() => handleChangePage('/customers')}
			>
				Customers
			</button>
			<button
				className={`
					${styles.navOption}
					${history.location.pathname === '/orders' && styles.navOption_selected}
				`}
				onClick={() => handleChangePage('/orders')}
			>
				Orders
			</button>
		</section>
	);
};

/* Dummy Redux */
const mapStateToProps = (state: any) => {
	return {
		helloWorld: state.helloWorld,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		helloWorld: () => dispatch(actions.helloWorld()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
