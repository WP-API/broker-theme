import React from 'react';

import NotFound from './NotFound';

import './Page.css';

export default class Page extends React.Component {
	componentWillMount() {
		if ( ! this.props.page && ! this.props.loading ) {
			this.props.onLoad();
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.path !== nextProps.path && ! nextProps.page ) {
			nextProps.onLoad();
		}
	}

	render() {
		const { loading, page } = this.props;
		if ( loading ) {
			return <div className="Page">
				<h1>Loading…</h1>
			</div>;
		}
		if ( ! page ) {
			return <NotFound />;
		}

		return <div className="Page">
			<h1
				dangerouslySetInnerHTML={ { __html: page.title.rendered } }
			/>
			<div
				dangerouslySetInnerHTML={ { __html: page.content.rendered } }
			/>
		</div>;
	}
}
