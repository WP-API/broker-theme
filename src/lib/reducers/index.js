import { combineReducers } from 'redux';

import user from './user';
import { apps, media, pages } from '../types';

export default combineReducers( {
	apps: apps.reducer,
	media: media.reducer,
	pages: pages.reducer,
	user,
} );
