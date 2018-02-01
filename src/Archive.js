import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';
import AppGrid from './App/Grid';
import withArchive from './lib/withArchive';

class Archive extends React.Component {
	render() {
		const { apps, loading } = this.props;

		if ( loading ) {
			return <div><h2>Loading…</h2></div>;
		}

		if ( ! apps ) {
			return <NotFound />;
		}

		return <Switch>
			<Route
				exact
				path="/"
				render={ props => <Home { ...this.props } { ...props } /> }
			/>
			<Route>
				<div>
					<h2>Archived Apps</h2>
					{ apps.length ?
						<AppGrid apps={ apps } />
					:
						<p>No apps found.</p>
					}
				</div>
			</Route>
		</Switch>;
	}
}
export default withArchive()( Archive );
