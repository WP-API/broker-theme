import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Main from './Main';
import rootReducer from './lib/reducers';
// import registerServiceWorker from './registerServiceWorker';

import './index.css';

const initialState = {
	apps: {
		archives: window.AppRegistryData.archives,
		posts: window.AppRegistryData.posts.filter( post => post.type === 'oauth2_client' ),
	},
	pages: {
		posts: window.AppRegistryData.posts.filter( post => post.type === 'pages' ),
	},
	user: window.AppRegistryData.user,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(
		applyMiddleware( thunkMiddleware )
	)
);

const render = Root => ReactDOM.render(
	<Provider store={ store }>
		<Router>
			<Root />
		</Router>
	</Provider>,
	document.getElementById( 'root' )
);

render( Main );

// registerServiceWorker();

if ( module.hot ) {
	module.hot.accept( './Main', () => import( './Main' ).then( nextModule => {
		render( nextModule.default );
	} ) );
}
