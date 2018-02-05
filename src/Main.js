import React from 'react';
import { Route, Switch } from 'react-router-dom'

import PageHeader from './PageHeader';
import AppPage from './containers/AppPage';
import AppCreate from './App/Create';
import FeaturedApps from './FeaturedApps';
import Footer from './Footer';
import Home from './Home';
import NewApps from './NewApps';
import MyApps from './MyApps';
import Page from './containers/Page';
import NotFound from './NotFound';
import Login from './User/Login';
import Profile from './User/Profile';

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
					component={ NewApps }
					exact
					path="/apps/newest"
				/>
				<Route
					component={ FeaturedApps }
					exact
					path="/apps/featured"
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
					component={ Login }
					path="/login"
				/>

				<Route
					component={ Profile }
					path="/profile"
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
		<Footer />
	</React.Fragment>;
}
