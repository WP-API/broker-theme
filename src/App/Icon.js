import React from 'react';

import './Icon.css';

export default function AppIcon( props ) {
	const { app } = props;

	let url;
	if ( app.icon && app.icon.url ) {
		url = app.icon.url;
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
