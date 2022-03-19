import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

/* Pages */
import BrandCampaignListPage from './pages/BrandCampaignListPage';

/* Styling */
import { theme, Layout } from './styles/styling';

/* Utils */
import history from './utils/History';


interface RouteProps {
	path: string;
	exact?: boolean;
	component: any;
}
export const CustomRoute = (props: RouteProps) => {
	const { path, exact, component: Component} = props;
	return (
		<Route 
			path={path}
			exact={exact}
			render={(renderProps: any) => {
				return (
					<Layout className={`${theme}`} hideNavBar={false}>
						<Component {...renderProps} />
					</Layout>
				);
			}}
		/>
	);
};

const BaseRouter = () => (
	<Router history={history}>
		<Switch>
			<CustomRoute exact path="/" component={BrandCampaignListPage} />
		</Switch>
	</Router>
);

export default BaseRouter;
