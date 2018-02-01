// import qs from 'qs';
// import { API_NONCE, API_ROOT, fetchOptions } from './lib/api';
// import { fetchArchive } from './lib/archives';
// import { getPageByPath } from './lib/pages';
import { apps, pages } from './lib/types';

// export const LOAD_PAGE = 'LOAD_PAGE';
// export const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';
// export const LOAD_PAGE_REQUEST = 'LOAD_PAGE_REQUEST';

export const getApp = apps.fetchSingle;
export const getAppForEdit = id => apps.fetchSingle( id, 'edit' );
export const getArchive = apps.fetchArchive;
export const updateApp = apps.updateSingle;
export const createApp = apps.createSingle;

// export const getPage = path => dispatch => {
// 	dispatch( { type: LOAD_PAGE_REQUEST, path } );

// 	getPageByPath( path )
// 		.then( data => {
// 			dispatch( { type: LOAD_PAGE, path, data } );
// 		} )
// 		.catch( err => {
// 			dispatch( { type: LOAD_PAGE_ERROR, path, err } );
// 		} );
// };
export const getPage = pages.fetchPageByPath;
