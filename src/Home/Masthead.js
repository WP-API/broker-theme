import React from 'react';

import './Masthead.css';

export default function Masthead( props ) {
	return <div className="Masthead">
		<p>Unlock the power of the WordPress REST API.</p>

		<form className="Masthead-search">
			<input
				placeholder="Find an app…"
				type="search"
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
