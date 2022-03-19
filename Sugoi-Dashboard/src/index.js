// Base imports
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Routing imports
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import history from './utils/History';
import reducer from './store/reducers/reducer';
import BaseRouter from './routes';

// Import css to remove margin
import './index.scss';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<Router history={history}>
			<BaseRouter />
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
