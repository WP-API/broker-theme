import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import AppIcon from '../AppIcon';
import NotFound from '../NotFound';
import UploadOverlay from '../UploadOverlay';
import AppSettings from './Details/AppSettings';
import VisibilitySettings from './Details/VisibilitySettings';
import DisplaySettings from './Details/DisplaySettings';
import Main from './Details/Main';
import Loading from './Details/Loading';

import './Details.css';

const needsEditable = props => ! props.loading && props.canEdit && ! ( 'raw' in props.app.content ) && props.action !== undefined;

export default class AppDetails extends React.Component {
	componentWillMount() {
		if ( ! this.props.app && ! this.props.loading ) {
			this.props.onLoad();
		}

		if ( needsEditable( this.props ) ) {
			this.props.onLoadForEdit();
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( needsEditable( nextProps ) ) {
			nextProps.onLoadForEdit();
		}
	}

	render() {
		const { app, canEdit, loading, saving, user } = this.props;

		if ( loading ) {
			return <Loading />;
		}
		if ( ! app ) {
			return <NotFound />;
		}

		const author = app._embedded.author[0];
		const url = `/apps/${ app.id }`;
		const loadingEditable = needsEditable( this.props );

		return <article className="AppDetails">
			{/*
			<div className="AppDetails-banner">
				<img
					alt=""
					src="https://ps.w.org/jetpack/assets/banner-772x250.jpg?rev=479904"
					srcSet="https://ps.w.org/jetpack/assets/banner-1544x500.png?rev=1173629 2x"
				/>
				{ canEdit ?
					<UploadOverlay />
				: null }
			</div>
			*/}

			<header>
				<div className="AppDetails-title">
					<AppIcon app={ app }>
						{ canEdit ?
							<UploadOverlay />
						: null }
					</AppIcon>

					<div>
						<h1
							dangerouslySetInnerHTML={ { __html: app.title.rendered } }
						/>
						<p className="AppDetails-byline">By { author.name }</p>
					</div>
				</div>

				<div className="AppDetails-actions">
					<a
						className="Button"
						href="http://example.com/"
					>Install</a>
				</div>
			</header>

			<nav className="AppDetails-subnav">
				<ul>
					<li><NavLink exact to={ `${ url }/` }>View</NavLink></li>
					<li><NavLink exact to={ `${ url }/edit/` }>App Settings</NavLink></li>
					<li><NavLink exact to={ `${ url }/display/` }>Display Settings</NavLink></li>
					<li><NavLink exact to={ `${ url }/visibility/` }>Visibility</NavLink></li>
				</ul>
			</nav>

			<Switch>
				<Route path={ `${ url }/edit/` }>
					{ loadingEditable ?
						<div>Loading...</div>
					:
						<React.Fragment>
							<h2>App Settings</h2>
							<p>These settings must pass through review once your app has been published to the directory.</p>
							<AppSettings
								app={ app }
								saving={ saving }
								onSave={ this.props.onSave }
							/>
						</React.Fragment>
					}
				</Route>
				<Route path={ `${ url }/display/` }>
					{ loadingEditable ?
						<div>Loading...</div>
					:
						<DisplaySettings app={ app } />
					}
				</Route>
				<Route path={ `${ url }/visibility/` }>
					{ loadingEditable ?
						<div>Loading...</div>
					:
						<React.Fragment>
							<h2>Visibility</h2>
							<VisibilitySettings
								app={ app }
							/>
						</React.Fragment>
					}
				</Route>
				<Route exact path={ url }>
					<Main
						app={ app }
						canEdit={ canEdit }
					/>
				</Route>
			</Switch>
		</article>
	}
}
