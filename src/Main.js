import React from 'react';
import { Route, Switch } from 'react-router-dom'

import PageHeader from './PageHeader';
import AppPage from './containers/AppPage';
import AppCreate from './AppCreate';
import Home from './Home';
import MyApps from './MyApps';
import Page from './containers/Page';
import NotFound from './NotFound';

export default function Main( props ) {
	return <React.Fragment>
		<PageHeader />
		<div className="wrapper">
			<Switch>
				<Route
					component={ MyApps }
					exact
					path="/apps/mine"
				/>
				<Route
					component={ AppCreate }
					exact
					path="/apps/new"
				/>

				<Route
					component={ AppPage }
					path="/apps/:id/:action?"
				/>

				<Route
					component={ Page }
					path="/:path+"
				/>

				<Route
					component={ Home }
					exact
					path="/"
				/>

				<Route component={ NotFound } />
			</Switch>
		</div>
		<p className="footer-text">
			Find the <a href="https://github.com/WP-API/broker-client">broker client</a> and <a href="https://github.com/WP-API/broker-server">broker server</a> source on GitHub.
		</p>
	</React.Fragment>;
}
