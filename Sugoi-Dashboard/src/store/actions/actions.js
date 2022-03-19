import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as ENV_VARIABLES from '../../config';

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