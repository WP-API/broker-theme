import { isFunction } from 'lodash/lang';
import React from 'react';
import { connect } from 'react-redux';

const resolve = ( maybeFunc, ...args ) => isFunction( maybeFunc ) ? maybeFunc( ...args ) : maybeFunc;

export default ( handler, getSubstate, id ) => Component => {
	class WrappedComponent extends React.Component {
		componentWillMount() {
			if ( ! this.props.posts && ! this.props.loading ) {
				this.props.onLoad();
			}
		}

		render() {
			return <Component { ...this.props } />;
		}
	}

	const mapStateToProps = ( state, props ) => {
		const substate = getSubstate( state );
		const resolvedId = resolve( id, props );
		const posts = handler.getArchive( substate, resolvedId );

		return {
			posts,
			loading: substate.loadingArchive === resolvedId,
		};
	};

	const mapDispatchToProps = ( dispatch, props ) => {
		return {
			onLoad: () => dispatch( handler.fetchArchive( resolve( id, props ) ) ),
		};
	};

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)( WrappedComponent );
}
