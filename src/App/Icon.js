import React from 'react';

import './Icon.css';

export default function AppIcon( props ) {
	const { app } = props;

	let url;
	if ( app.featured_media && app._embedded && app._embedded['wp:featuredmedia'] ) {
		const featured = app._embedded['wp:featuredmedia'][0];
		url = `url( ${ featured.media_details.sizes.thumbnail.source_url } )`;
	} else {
		const pattern = window.GeoPattern.generate( app.title.rendered );
		url = pattern.toDataUrl();
	}

	return <div
		className="AppIcon"
		style={ { backgroundImage: url } }
	>
		{ props.children }
	</div>;
}
