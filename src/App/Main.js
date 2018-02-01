import React from 'react';

import './Main.css';

import Link from '../Link';

export default function Main( props ) {
	const { app, canEdit } = props;

	return <div className="AppDetails_Main">
		{ app.content.rendered.length ?
			<div
				className="AppDetails_Main-content"
				dangerouslySetInnerHTML={ { __html: app.content.rendered } }
			/>
		:
			<div className="AppDetails_Main-content">
				<p><em>This app does not have a description.</em></p>
				{ canEdit ?
					<Link href={ './edit/' }>Add one now!</Link>
				: null }
			</div>
		}

		<aside className="AppDetails_Main-sidebar">
			<div>
				<nav>
					<ul>
						<li><a href="http://example.com/">{ app.title.rendered } Website</a></li>
					</ul>
				</nav>
			</div>
		</aside>
	</div>;
}
