import { apps, media, pages } from './types';

const API_ROOT = window.AppRegistryData.site.api;

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const getApp = apps.fetchSingle;
export const getAppForEdit = id => apps.fetchSingle( id, 'edit' );
export const getArchive = apps.fetchArchive;
export const updateApp = apps.updateSingle;
export const createApp = apps.createSingle;
export const searchForApps = term => {
	apps.registerArchive( `search/${ term }`, {
		search: term,
		orderby: 'relevance',
	} );
	return apps.fetchArchive( `search/${ term }` );
};

export const getPage = pages.fetchPageByPath;

export const getImage = media.fetchSingle;
export const uploadFile = media.uploadSingle;

export const logIn = ( username, password, remember ) => dispatch => {
	dispatch( { type: LOG_IN_REQUEST } );

	const url = `${ API_ROOT }auth/v0/sessions?_embed`;
	const data = {
		username,
		password,
		remember,
		auth_nonce: window.AppRegistryData.site.auth_nonce,
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( data ),
		credentials: 'include',
	};
	fetch( url, options )
		.then( resp => {
			return resp.json().then( data => {
				if ( ! resp.ok ) {
					throw new Error();
				}

				const { expiration, nonce } = data;
				const user = data._embedded.author[0];
				dispatch( { type: LOG_IN, user, expiration, nonce } );

				// Update the handler query arguments.
				[ apps, pages ].forEach( handler => {
					handler.query._wpnonce = nonce;
				} );
			} );
		} )
		.catch( error => {
			dispatch( { type: LOG_IN_ERROR, error } );
		} );
};
export const logOut = () => ( dispatch, getState ) => {
	const state = getState();

	console.log( state );

	const url = `${ API_ROOT }auth/v0/sessions/current?_wpnonce=${ state.user.nonce }`;
	const options = {
		method: 'DELETE',
		credentials: 'include',
	};
	fetch( url, options )
		.then( resp => {
			return resp.json().then( data => {
				if ( ! resp.ok ) {
					throw new Error();
				}

				dispatch( { type: LOG_OUT } );
			} );
		} );
}
