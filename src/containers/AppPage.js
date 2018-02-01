import { connect } from 'react-redux';

import AppDetails from '../App/Details';
import { getApp, getAppForEdit, updateApp } from '../lib/actions';
import { apps } from '../lib/types';

const getId = props => parseInt( props.match.params.id, 10 );

const canEdit = ( user, app ) => {
	if ( ! app || ! user ) {
		return false;
	}

	if ( app.author === user ) {
		return true;
	}

	if ( 'edit_posts' in user.capabilities ) {
		return true;
	}

	return false;
};

const mapStateToProps = ( state, props ) => {
	const id = getId( props );
	const app = apps.getSingle( state.apps, id );

	return {
		action:  props.match.params.action,
		app:     app,
		canEdit: app ? canEdit( state.user.data, app ) : null,
		loading: apps.isPostLoading( state.apps, id ),
		saving:  apps.isPostSaving( state.apps, id ),
		user:    state.user.data,
	};
};

const mapDispatchToProps = ( dispatch, props ) => {
	const id = getId( props );

	return {
		onLoad:        () => dispatch( getApp( id ) ),
		onLoadForEdit: () => dispatch( getAppForEdit( id ) ),
		onSave:        data => dispatch( updateApp( data ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( AppDetails );
