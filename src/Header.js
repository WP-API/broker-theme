import React from 'react';

import './Header.css';

export default function Header( props ) {
	const { children, title } = props;

	return <header className="Header">
		<h2>{ title }</h2>

		<ul className="Header-links">
			{ children }
		</ul>
	</header>;
}
export const Separator = Header.Separator = () => <li className="Header-Separator" />;
