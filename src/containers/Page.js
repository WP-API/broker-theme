import { connect } from 'react-redux';

import Page from '../Page';
import { getPage } from '../lib/actions';
import { normalizePath, pages } from '../lib/types';

const mapStateToProps = ( state, props ) => {
	const { path } = props.match.params;
	// const normalized = normalizePath( path );
	const page = pages.getPageByPath( state, path );
	// const page = state.pages.posts.find( page => pathForPage( page ) === normalized );

	return {
		page,
		path,
		loading: state.pages.loading === path,
	};
};

const mapDispatchToProps = ( dispatch, props ) => {
	const { path } = props.match.params;

	return {
		onLoad: () => dispatch( getPage( path ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Page );
