import React from 'react';

import AppGrid from './App/Grid';
import AppGridAction from './App/GridAction';
import NotFound from './NotFound';
import withArchive from './lib/withArchive';

const NewApps = props => {
	const { hasMore, loading, loadingMore, posts } = props;

	if ( loading ) {
		return <div><h2>Loading…</h2></div>;
	}

	if ( ! posts ) {
		return <NotFound />;
	}

	return <div className="NewApps">
		<h2>Newest Apps</h2>
		{ posts.length ?
			<AppGrid apps={ posts } />
		:
			<p>No apps found.</p>
		}

		{ loadingMore ?
			<AppGridAction><span>Loading…</span></AppGridAction>
		: hasMore ?
			<AppGridAction><a onClick={ () => props.onLoadMore() }>Load more</a></AppGridAction>
		: null }
	</div>;
};

export default withArchive( 'apps/newest' )( NewApps );
