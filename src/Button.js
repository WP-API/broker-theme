import React from 'react';

import './Button.css';

export default function Button( props ) {
	return <button
		className="Button"
		disabled={ !! props.disabled }
		type={ props.submit ? 'submit' : 'button' }
		onClick={ props.onClick }
	>
		{ props.children }
	</button>;
}
