import { withArchive } from '@humanmade/repress';

import { apps } from './types';

const normalizePath = path => path.replace( /^\/+|\/+$/g, '' );

export default ( id = null ) => {
	return withArchive(
		apps,
		state => state.apps,
		id || ( props => normalizePath( props.match.path ) )
	);
};
