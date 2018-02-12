import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader';

import './Icon.css';

export default function AppIcon( props ) {
	const { app, isUploading } = props;

	if ( isUploading ) {
		return <div className="AppIcon">
			<ContentLoader
				height="128"
				width="128"
			>
				<Rect
					height="128"
					width="128"
					x="0"
					y="0"
				/>
			</ContentLoader>
		</div>;
	}

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
