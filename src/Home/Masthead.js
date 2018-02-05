import React from 'react';
import { withRouter } from 'react-router-dom';

import './Masthead.css';

class Masthead extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			search: '',
		};
	}

	onSubmit = e => {
		e.preventDefault();

		const path = '/search/' + encodeURIComponent( this.state.search );
		this.props.history.push( path );
	}

	render() {
		return <div className="Masthead">
			<p>Unlock the power of the WordPress REST API.</p>

			<form className="Masthead-search" onSubmit={ this.onSubmit }>
				<input
					placeholder="Find an app…"
					type="search"
					value={ this.state.search }
					onChange={ e => this.setState( { search: e.target.value } ) }
				/>
				<button
					type="submit"
				>
					<i className="dashicons dashicons-search"></i>
					<span className="screen-reader-text">Search</span>
				</button>
			</form>
		</div>;
	}
}

export default withRouter( Masthead );
