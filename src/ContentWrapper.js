import React from 'react';

import './ContentWrapper.css';

export default function ContentWrapper( props ) {
	return <article className={ `ContentWrapper ${ props.className || '' }` }>
		{ props.children }
	</article>;
}
