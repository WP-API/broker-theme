import React from 'react';

import { NavLink } from 'react-router-dom';

const Link = props => {
	const { children, href } = props;
	const home = window.AppRegistryData.site.home;

	if ( href.substring( 0, home.length ) === home ) {
		return <NavLink activeClassName="active" to={ href.substring( home.length ) }>{ children }</NavLink>;
	} else if ( href.substring( 0, 1 ) === '/' || href.substring( 0, 1 ) === '.' ) {
		return <NavLink activeClassName="active" to={ href }>{ children }</NavLink>;
	} else {
		return <a href={ href }>{ children }</a>;
	}
};

export default Link;
