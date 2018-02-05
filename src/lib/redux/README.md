# API Redux

This is a library for using the WordPress REST API with Redux.

Requires Redux and Redux Thunk.

## The Basics

This library is a reusable tool that you can gradually add to your codebase. You simply create "handlers" for every top-level object (posts or CPTs, comments, terms, and users) you'd like to keep in your Redux store, and the handler takes care of dispatching.

The handler "owns" a piece of your global Redux state called the **substate**, and handles dispatching and reducing any actions related to it. You can keep the substate wherever you want in your Redux store, allowing you to incrementally adopt the library.

Setting up a handler is a three-step process:

1. Instantiate a handler with options for the type
2. Add the reducer to the store
3. Create actions and helpers using the handler's methods


### A Simple Example

Typically, you'll want to have a single `types.js` file containing the setup for all your types. You can then use in your regular `actions.js` and `reducer.js` files used in Redux.

```js
// types.js
import { handler } from 'MODULE_NAME';

export const posts = new handler( {
	// `type` (required): used to derive the action names, and typically should
	// match the object type (post type, taxonomy, etc).
	type: 'posts',

	// `url` (required): base URL for the type.
	url:   window.wpApiSettings.url + 'wp/v2/posts',

	// `nonce`: REST API nonce. Only required if you want to write data.
	nonce: window.wpApiSettings.nonce,

	// `fetchOptions`: default options to pass to fetch().
	// fetchOptions: { credentials: 'include' },

	// `query`: default query arguments to include in every request.
	// query: {},

	// `rethrow`: Should we rethrow API errors after dispatching the action? See Actions below.
	// rethrow: true,

	// `actions`: action overrides. See Internals below.
	// actions: {},
} );

// Register any static archives up-front.
posts.registerArchive( 'home', {} );
```

```js
// actions.js

import { posts } from './types';

export const getPost = posts.fetchSingle;
export const getPostArchive = posts.fetchArchive;
export const getFrontPage = () => posts.fetchArchive( 'home' );
```

```js
// reducer.js
import { combineReducers } from 'redux';

import { posts } from './types';

export default combineReducers( {
	// Any regular reducers you have go in here just like normal.

	// Then, create a substate for your handlers.
	posts: posts.reducer,
} );
```

In your connected components, you can use the helpers to pull out data from the substate easily:

```js
// Post.js
import React from 'react';
import { connect } from 'react-redux';

import { posts } from './types';

const Post = props => <div>
	<h1>{ props.post.title.rendered }</h1>
</div>;

const mapStateToProps = ( state, props ) => {
	return {
		// Pass the substate when pulling out data.
		post: posts.getSingle( state.posts, props.id ),
	};
};

export default connect( mapStateToProps )( Post );
```


## Archives

An archive is any list of objects associated with an ID. For performance, archives are registered up-front, and their results are cached.

Archives can be registered in one of two ways:

```js
// Register archives with static arguments.
posts.registerArchive( 'home', {} );
posts.registerArchive( 'stickied', { sticky: '1' } );
posts.registerArchive( 'oldest', {
	order: 'desc',
	orderby: 'date',
} );

// Or, register a function which returns the arguments:
posts.registerArchive( 'today', () => {
	return {
		after:  moment().startOf( 'day' ).toISOString(),
		before: moment().endOf( 'day' ).toISOString(),
	}
} );

// The function is also passed the full state, if you want to use it:
posts.registerArchive( 'mine', state => {
	return {
		author: state.user.id,
	}
} );
```


### withArchive

You can use the `withArchive` HOC to access your data in your components:

```js
// TodayArchive.js
import React from 'react';
import withArchive from 'MODULE_NAME';

import { posts } from './types';

const TodayArchive = props => <ul>
	{ props.posts.map( post =>
		<li key={ post.id }>
			{ post.title.rendered }
		</li>
	) }
</ul>;

export default withArchive(
	// Handler object:
	posts,

	// getSubstate() - returns the substate
	state => state.posts,

	// Archive ID
	'today'
)( TodayArchive );
```

`withArchive` components will automatically load the archive if it's not available in the store. Your component receives three props:

* `posts` (`object[]`): A list of objects in the archive.
* `loading` (`boolean`): Whether the archive is currently being loaded.
* `onLoad` (`Function`): Loader function. Called automatically by the HOC, but you can call this again if needed.
* `hasMore` (`boolean`): Whether there are more pages of the archive to load.
* `loadingMore` (`boolean`): Whether the next page of the archive is being loaded.
* `onLoadMore` (`Function`): Loader function. Call this to load the next page of the archive.

For convenience, you might want to make your own HOC to simplify this to just an ID:

```js
import { withArchive } from 'MODULE_NAME';

import { posts } from './types';

export default id => withArchive( posts, state => state.posts, id );
```

Rather than passing a static ID, you can also pass an ID function, which will be called with your props. If you're using React Router, this allows you to easily use your route's `path` as the archive ID:

```js
export const normalizePath = path => path.replace( /^\/+|\/+$/g, '' );
export default withArchive(
	posts,
	state => state.posts,
	props => normalizePath( props.match.path )
)( TodayArchive );
```


### Pagination

Pagination support for archives is included out of the box. To load the next page in an archive, simply call the `onLoadMore` prop passed in by `withArchive`.

You usually only want to call `onLoadMore` if there actually is more to load, so you should check `hasMore` before calling the function. Also, you should typically only call `onLoadMore` based on user input (a button, link, scroll handler, etc); if you need more posts on load, increase the `per_page` parameter in your query instead.

For example, the following component renders a simple list of posts with a button to allow fetching more:

```js
function Blog( props ) {
	const { hasMore, loading, loadingMore, posts } = props;

	if ( loading ) {
		return <div>Loading…</div>;
	}

	if ( ! posts ) {
		return <div>No posts</div>;
	}

	return <div>
		<ol>
			{ posts.map( post =>
				<li key={ post.id }>{ post.title.rendered }</li>
			) }
		</ol>

		{ loadingMore ?
			<p>Loading more…</p>
		: hasMore ?
			<button
				type="button"
				onClick={ () => props.onLoadMore() }
			>Load More</button>
		: null }
	</div>;
}
export default withArchive( posts, state => state.posts, 'blog' )( Blog );
```


### Dynamic Archives

If needed, you can dynamically register archives when needed. Note that you'll need the archive ID to access the results, so make sure it's predictable. You should only do this when you can't determine the ID beforehand (such as in dynamic routes), as it tends to make your code less readable.

```js
export const search = term => {
	posts.registerArchive( `search/${ term }`, {
		search: term,
		orderby: 'relevance',
	} );
	return posts.fetchArchive( `search/${ term }` );
};

export const getYearArchive = year => {
	posts.registerArchive( `years/${ year }`, {
		after:  moment( { year } ).startOf( 'year' ),
		before: moment( { year } ).endOf( 'year' ),
	} );
	return posts.fetchArchive( `years/${ year }` );
};
```


## Actions

The handler contains 4 built-in action creators, which mirror the actions available from the REST API:

* `fetchArchive( id )`: Fetches query results for the type.
* `fetchSingle( id )`: Fetches a single object.
* `updateSingle( id )`: Updates a single object.
* `createSingle( id )`: Creates a single object.

Each of these is an action creator, which returns an action; specifically, a thunk. These thunks each return the request promise.

When dispatching these actions, you can use the promise returned by `dispatch()` to do any non-Redux actions you may need to do:

```js
import { posts } from './types';

class MyComponent extends React.Component {
	// ...
	onSave( data ) {
		this.props.dispatch( posts.updateSingle( data ) )
			.then( id => {
				this.setState( {
					loading: false,
					saved: true,
				} );
			} )
			.catch( error => {
				this.setState( {
					loading: false,
					saved: false,
					error
				})
			});
	}
}
```

Note that errors will be rethrown to allow you to handle them in your promise callbacks. If you'd prefer not to have this behaviour, you can set the `rethrow` option to `false` when instantiating the handler.


## Internals

### Substate Format

Each handler's substate is an object with the following properties:

* `archives`: An object containing a map from archive ID to list of object IDs.
* `posts`: A flat list of all posts objects.
* `loadingArchive`: A string indicating the currently loading archive. `false` if not loading.
* `loadingPost`: A number indicating the currently loading object ID. `false` if not loading.
* `saving`: A number indicating the currently saving object ID. `false` if not loading.

Generally, you should use the helpers on the handler object rather than reaching into the substate directly.

**Note:** The substate may be partially uninitialised if the state was initialised by Redux's `initialState` parameter. Any code that reaches into the substate must be prepared to deal with this.

### Actions

By default, the action names are automatically derived from the type you pass in. These are named `{action}_{type}`, where `{action}` is one of `QUERY` (for `fetchArchive`), `LOAD` (for `fetchSingle`), `CREATE` (for `createSingle`) or `UPDATE` (for `updateSingle`). They are split into three subactions: request (`{action}_{type}_REQUEST`), success (`{action}_{type}`) and error (`{action}_{type}_ERROR`).

For example, for `new handler( { type: 'post' } )`, the actions fired by `fetchArchive` are:

* `QUERY_POST_REQUEST`
* `QUERY_POST` on successful response
* `QUERY_POST_ERROR` on error from the API

Each action includes relevant data and IDs, allowing you to store additional data in the rest of your store. For example, you may want to store the error object for display to the user.

These default actions can be overridden by passing the `actions` option to the constructor.


## About

### Roadmap

* Add delete actions
* Add pagination support for archives
