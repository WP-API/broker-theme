import React from 'react';

export default function Actions( props ) {
	const { app } = props;
	if ( ! app.meta.url ) {
		return null;
	}

	return <div className="AppDetails-actions">
		<a
			className="Button"
			href={ app.meta.url }
		>Install</a>
	</div>;
}
