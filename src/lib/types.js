import { handler } from '@humanmade/repress';
import { hierarchicalHandler } from './hierarchicalHandler';

const API_ROOT = window.AppRegistryData.site.api;
const API_NONCE = window.AppRegistryData.site.nonce;
const SITE_HOME = window.AppRegistryData.site.home;


export const apps = new handler( {
	nonce: API_NONCE,
	type:  'oauth2_client',
	url:   `${ API_ROOT }wp/v2/apps`,
	query: {
		_embed: '1',
	},
} );
apps.registerArchive( '', {} );
apps.registerArchive( 'apps/mine', state => {
	return {
		author: state.user.data ? state.user.data.id : 0,
		orderby: 'title',
		status: 'any',
	};
} );
apps.registerArchive( 'apps/featured', {
	sticky: true,
} );
apps.registerArchive( 'apps/newest', {
	orderby: 'date',
} );

export const media = new handler( {
	nonce: API_NONCE,
	type:  'attachment',
	url:   `${ API_ROOT }wp/v2/media`,
} );
media.uploadSingle = ( function ( file ) {
	return dispatch => {
		// Create temporary ID to allow tracking request.
		const id = '_tmp_' + this.tempId++;

		dispatch( { type: this.actions.createStart, id, data: {} } );

		const options = {
			method: 'POST',
			body: new FormData(),
		};
		options.body.append( 'file', file );
		return this.fetch( this.url, { context: 'edit' }, options )
			.then( data => {
				dispatch( { type: this.actions.createSuccess, id, data } );
				return data.id;
			} )
			.catch( error => {
				console.log( error );
				dispatch( { type: this.actions.createError, id, error } );

				// Rethrow for other promise handlers.
				if ( this.rethrow ) {
					throw error;
				}
			} );
	};
} ).bind( media );

export const pages = new hierarchicalHandler( {
	nonce: API_NONCE,
	type:  'page',
	url:   `${ API_ROOT }wp/v2/pages`,
	query: {
		_embed: '1',
	},
	homeUrl: SITE_HOME,
} );
