import React from 'react';
import { Link } from 'react-router-dom';

import AppIcon from './Icon';

import './Card.css';

/*const rating = num => {
	let content = [];
	for ( let i = 0; i < 5; i++ ) {
		content.push( <span key={ i } className="dashicons dashicons-star-filled" /> );
	}
	return content;
};*/

export default function AppCard( props ) {
	const { app } = props;
	const author = app._embedded && app._embedded.author ? app._embedded.author[0] : null;

	return <div className="AppCard">
		<div className="AppCard-main">
			<AppIcon app={ app } />

			<div className="AppCard-content">
				<h2>
					<Link to={ `/apps/${ app.id }/` }>{ app.title.rendered }</Link>

					{ app.status === 'draft' ?
						<span className="AppCard-draft">Draft</span>
					: null }
				</h2>

				{ /*
				<div className="AppCard-rating">
					{ rating( 4 ) }
				</div>
				*/}

				{ app.excerpt.text ?
					<div className="AppCard-excerpt"><p>{ app.excerpt.text }</p></div>
				:
					<div
						className="AppCard-excerpt"
						dangerouslySetInnerHTML={ { __html: app.excerpt.rendered } }
					/>
				}
			</div>
		</div>
		<footer>
			{ author ?
				<p className="AppCard-author"><i className="dashicons dashicons-admin-users"></i> { author.name }</p>
			: null }
			{/*
				<p className="AppCard-stats"><i className="dashicons dashicons-chart-area"></i> 5+ million installs</p>
			*/}
		</footer>
	</div>
}
