import React from 'react';

import './Label.css';

export default function Label( props ) {
	return <span className={ `Label ${ props.color }` }>
		{ props.children }
	</span>;
}

Label.defaultProps = {
	color: 'blue',
};
