import React from 'react';

import Logo from './Logo';

import './Header.css';

export default function Header( props ) {
	const { children, title } = props;

	return <header className="Header">
		<h2><Logo light /> { title }</h2>

		<ul className="Header-links">
			{ children }
		</ul>
	</header>;
}
export const Separator = Header.Separator = () => <li className="Header-Separator" />;
