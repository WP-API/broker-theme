import React from 'react';

import Link from '../Link';

import './StartHere.css';

export default function StartHere( props ) {
	return <div className="StartHere">
		<div>
			<h2>Developers</h2>
			<p>Build apps for the WordPress REST API using App Connect.</p>
			<nav>
				{ props.user.data ?
					<Link href="/apps/mine/">View your Applications</Link>
				:
					<Link href="/login/">Log In to Register Applications</Link>
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
