import { handler } from './redux';

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

export const pages = new handler( {
	nonce: API_NONCE,
	type:  'page',
	url:   `${ API_ROOT }wp/v2/pages`,
	query: {
		_embed: '1',
	},
} );

// Add our extra tools.
export const normalizePath = path => path.replace( /^\/+|\/+$/g, '' );
const pathForPage = page => normalizePath( page.link.substr( SITE_HOME.length ) );
pages.archiveForPath = path => `pages/${ normalizePath( path ) }`;
pages.fetchPageByPath = path => {
	// Query by slug for the final path component.
	const normalized = normalizePath( path );
	const components = normalized.split( '/' );
	const id = pages.archiveForPath( path );
	pages.registerArchive( id, {
		slug: components.slice( -1 )[0],
	} );

	return pages.fetchArchive( id );
};
pages.getPageByPath = ( state, path ) => {
	const normalized = normalizePath( path );
	const allMatching = pages.getArchive( state.pages, pages.archiveForPath( normalized ) );
	if ( ! allMatching ) {
		return null;
	}

	// Whittle down to the only one that matches fully.
	return allMatching.find( page => pathForPage( page ) === normalized );
};
