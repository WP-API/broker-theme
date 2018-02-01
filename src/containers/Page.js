import { connect } from 'react-redux';

import Page from '../Page';
import { getPage } from '../lib/actions';
import { normalizePath, pages } from '../lib/types';

const mapStateToProps = ( state, props ) => {
	const { path } = props.match.params;
	const page = pages.getPageByPath( state, path );
	const id = pages.archiveForPath( path );

	return {
		page,
		path,
		loading: pages.isArchiveLoading( state.pages, id ),
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
