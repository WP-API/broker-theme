import React from 'react';

import './Developers.css';

export default function Developers( props ) {
	return <div className="Developers">
		<h2>Developers</h2>
		<p>Build apps for the WordPress REST API using WordPress App Connect.</p>
		<nav>
			{ props.user ?
				<a href="<?php echo home_url( '/apps/' ) ?>">View your Applications</a>
			:
				<a href="<?php echo wp_login_url( home_url( '/apps/' ) ) ?>">Log In to Register Applications</a>
			}
		</nav>
	</div>;
}
