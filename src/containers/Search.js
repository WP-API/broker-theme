import { connect } from 'react-redux';

import Search from '../Search';
import { searchForApps } from '../lib/actions';
import { apps } from '../lib/types';

const termFromProps = props => props.match.params.term;

const mapStateToProps = ( state, props ) => {
	const term = termFromProps( props );
	console.log( props, term );
	const id = `search/${ term }`;
	console.log( id );
	const posts = apps.getArchive( state.apps, id );

	return {
		posts,
		loading: apps.isArchiveLoading( state.apps, id ),
		hasMore: apps.hasMore( state.apps, id ),
		loadingMore: apps.isLoadingMore( state.apps, id ),
	};
};

const mapDispatchToProps = ( dispatch, props ) => {
	const term = termFromProps( props );
	return {
		onLoad:     () => dispatch( searchForApps( term ) ),
		onLoadMore: () => dispatch( apps.fetchMore( state => state.apps, `search/${ term }` ) ),
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Search );
