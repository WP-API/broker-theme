import { combineReducers } from 'redux';

import { apps, pages } from '../types';

export default combineReducers( {
	apps: apps.reducer,
	pages: pages.reducer,
	user: ( state = {} ) => state,
} );
