import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	helloWorld: true,
};

// Global authentication ----
const setHelloWorld = (state) => {
	return updateObject(state, {
		helloWorld: true
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// Global authentication -------------------------------
		case actionTypes.HELLO_WORLD:
			return setHelloWorld(state, action);

		default:
			return state;
	}
};

export default reducer;
