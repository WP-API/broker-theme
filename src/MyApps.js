import React from 'react';

import AppGrid from './App/Grid';
import AppGridAction from './App/GridAction';
import Link from './Link';
import NotFound from './NotFound';
import withArchive from './lib/withArchive';

const MyApps = props => {
	const { hasMore, loading, loadingMore, posts } = props;

	if ( loading ) {
		return <div><h2>Loading…</h2></div>;
	}

	if ( ! posts ) {
		return <NotFound />;
	}

	return <div className="MyApps">
		<h2>My Apps</h2>
		{ posts.length ?
			<AppGrid apps={ posts } />
		:
			<React.Fragment>
				<p>No apps found.</p>
				<p><Link href="/apps/new/">Create your first app now</Link>
					{ ' or ' }
				<Link href="/connect-for-developers/">learn how to build apps</Link> for App Connect.</p>
			</React.Fragment>
		}

		{ loadingMore ?
			<AppGridAction><span>Loading…</span></AppGridAction>
		: hasMore ?
			<AppGridAction><a onClick={ () => props.onLoadMore() }>Load more</a></AppGridAction>
		: null }

		<AppGridAction><Link href="/apps/new/">Create new app</Link></AppGridAction>
	</div>;
};

export default withArchive( 'apps/mine' )( MyApps );
