import React from 'react';

import AppCard from './AppCard';

import './AppGrid.css';

export default function AppGrid( props ) {
	return <div className="AppGrid">
		{ props.apps.map( app =>
			<AppCard
				key={ app.id }
				app={ app }
			/>
		) }
	</div>;
}
