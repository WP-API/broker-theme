import { isFunction } from 'lodash/lang';
import React from 'react';
import { connect } from 'react-redux';

export const resolve = ( maybeFunc, ...args ) => isFunction( maybeFunc ) ? maybeFunc( ...args ) : maybeFunc;

export default ( handler, getSubstate, path ) => Component => {
	class WrappedComponent extends React.Component {
		componentWillMount() {
			if ( ! this.props.page && ! this.props.loading ) {
				this.props.onLoad();
			}
		}

		componentWillReceiveProps( nextProps ) {
			if ( ! nextProps.page && this.props.pagePath !== nextProps.pagePath ) {
				nextProps.onLoad();
			}
		}

		render() {
			return <Component { ...this.props } />;
		}
	}

	const mapStateToProps = ( state, props ) => {
		const substate = getSubstate( state );
		const resolvedPath = resolve( path, props );
		const page = handler.getSingleByPath( substate, resolvedPath );

		return {
			page,
			pagePath: resolvedPath,
			loading:  handler.isArchiveLoading( substate, resolvedPath ),
		};
	};

	const mapDispatchToProps = ( dispatch, props ) => {
		const resolvedId = resolve( path, props );
		return {
			onLoad: () => dispatch( handler.fetchSingleByPath( resolvedId ) ),
		};
	};

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)( WrappedComponent );
}
