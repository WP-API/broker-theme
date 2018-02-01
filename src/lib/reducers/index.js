import { combineReducers } from 'redux';

import user from './user';
import { apps, pages } from '../types';

export default combineReducers( {
	apps: apps.reducer,
	pages: pages.reducer,
	user,
} );
