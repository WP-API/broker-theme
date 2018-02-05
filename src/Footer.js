import React from 'react';

import './Footer.css';

export default function Footer() {
	return <footer className="Footer">
		<div className="wrapper">
			<div>
				<h2>WP App Directory</h2>
				<p>Proudly powered by <a href="https://wordpress.org">WordPress</a>.</p>
				<p>This site was built with ❤️ by the REST API focus team
					and <a href="https://github.com/WP-API/broker-theme/graphs/contributors">the contributors</a>.</p>
			</div>
			<div>
				<h3>Useful Links</h3>
				<ul>
					<li><a href="https://wordpress.org/plugins/connect/">App Connect Plugin</a></li>
					<li><a href="https://github.com/WP-API/broker-server">App Connect Server</a></li>
					<li><a href="https://developer.wordpress.org/rest-api/">WordPress REST API Reference</a></li>
				</ul>
			</div>
		</div>
	</footer>;
}
