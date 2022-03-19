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
			<div className={styles.brandNavOptions}>
				<p className={styles.logo}> h. </p>
				<button
					className={`
						${styles.iconBox}
						${history.location.pathname === '/' && styles.iconBox_selected}
					`}
					onClick={() => handleChangePage('/')}
				>
					<i className={`icofont icofont-home ${styles.icon} 
						${window.location.pathname === '/' ? styles.active : ''}`} />
				</button>
			</div>
			<button
				className={`
					${styles.iconBox}
				`}
				onClick={handleLogout}
			>
				<i className={`icofont icofont-logout ${styles.icon}`} />
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
