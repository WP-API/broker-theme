import React from 'react';

import './StartHere.css';

export default function StartHere( props ) {
	return <div className="StartHere">
		<div>
			<h2>Developers</h2>
			<p>Build apps for the WordPress REST API using App Connect.</p>
			<nav>
				{ props.user ?
					<a href="<?php echo home_url( '/apps/' ) ?>">View your Applications</a>
				:
					<a href="<?php echo wp_login_url( home_url( '/apps/' ) ) ?>">Log In to Register Applications</a>
				}
			</nav>
		</div>

		<div>
			<h2>Learn More</h2>
			<p>Learn about how App Connect works.</p>

			<nav>
				<a href="/about/">Learn More</a>
			</nav>
		</div>
	</div>;
}
