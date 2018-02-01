import React from 'react';
import { connect } from 'react-redux';

import withArchive from './lib/withArchive';

import AppGrid from './App/Grid';
import AppGridAction from './App/GridAction';
import Developers from './Home/Developers';
import Masthead from './Home/Masthead';
import NotFound from './NotFound';

import './Home.css';

const Home = props => {
	const { loading, posts, user } = props;

	if ( loading ) {
		return <div><h2>Loading…</h2></div>;
	}

	if ( ! posts ) {
		return <NotFound />;
	}

	const featured = posts.filter( app => app.sticky );

	return <div className="Home">
		<Masthead />

		{ featured.length > 0 ?
			<React.Fragment>
				<h2>Featured Apps</h2>
				<AppGrid apps={ featured } />
			</React.Fragment>
		: null }

		<h2>Newest Apps</h2>
		<AppGrid apps={ posts } />
		<AppGridAction><a href="#">See all</a></AppGridAction>

		<Developers user={ user } />
	</div>;
}

const mapStateToProps = ( { user } ) => ( { user } );
export default connect( mapStateToProps )( withArchive( '' )( Home ) );