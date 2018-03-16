import { handler } from '@humanmade/repress';

export const normalizePath = path => path.replace( /^\/+|\/+$/g, '' );

export class hierarchicalHandler extends handler {
	constructor( options ) {
		super( options );

		this.homeUrl = options.homeUrl || window.location.origin;
		this.archivePrefix = options.archivePrefix || 'pages/';
	}

	_maybeRegisterArchiveForPath( path ) {
		// Query by slug for the final path component.
		const normalized = normalizePath( path );
		const components = normalized.split( '/' );
		const id = this.archivePrefix + path;
		this.registerArchive( id, {
			slug: components.slice( -1 )[0],
		} );
		return id;
	}

	fetchSingleByPath( path ) {
		const id = this._maybeRegisterArchiveForPath( path );
		return this.fetchArchive( id );
	}

	pathForSingle( page ) {
		let url = page.link;
		if ( url.substr( 0, this.homeUrl.length ) === this.homeUrl ) {
			url = url.substr( this.homeUrl.length );
		}

		return normalizePath( url );
	}

	isPathLoading( substate, path ) {
		return this.isArchiveLoading( substate, this.archivePrefix + normalizePath( path ) );
	}

	getSingleByPath( substate, path ) {
		const normalized = normalizePath( path );
		const allMatching = this.getArchive( substate, this.archivePrefix + normalized );
		if ( ! allMatching ) {
			return null;
		}

		// Whittle down to the only one that matches fully.
		return allMatching.find( page => this.pathForSingle( page ) === normalized );
	}
}
