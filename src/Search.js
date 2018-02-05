import React from 'react';

import AppGrid from './App/Grid';
import AppGridAction from './App/GridAction';

export default class Search extends React.Component {
	componentWillMount() {
		if ( ! this.props.posts && ! this.props.loading ) {
			this.props.onLoad();
		}
	}

	render() {
		const { hasMore, loading, loadingMore, posts } = this.props;

		if ( loading ) {
			return <div className="Search">
				<h2>Search results</h2>
				<p>Loading…</p>
			</div>;
		}

		return <div className="Search">
			<h2>Search results</h2>
			{ posts && posts.length ?
				<AppGrid apps={ posts } />
			:
				<p>No apps found.</p>
			}

			{ loadingMore ?
				<AppGridAction><span>Loading…</span></AppGridAction>
			: hasMore ?
				<AppGridAction><a onClick={ () => this.props.onLoadMore() }>Load more</a></AppGridAction>
			: null }
		</div>;
	}
}
