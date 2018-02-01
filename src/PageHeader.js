import React from 'react';
import { connect } from 'react-redux';

import Link from './Link';

import './PageHeader.css';

function PageHeader( props ) {
	const { site } = window.AppRegistryData;
	const { user } = props;

	return <header className="PageHeader">
		<h2>
			<Link href="/">{ site.name }</Link>
		</h2>

		<ul className="user-links">
			{ site.menus.primary.map( item =>
				<li key={ item.id }>
					<Link href={ item.href }>
						{ item.title }
					</Link>
				</li>
			) }
			<li className="PageHeader-separator" />
			{ user ?
				<React.Fragment>
					<li><Link href="/apps/mine/">My Apps</Link></li>
					<li><Link href="/profile/">{ user.name }</Link></li>
					<li><Link href="/logout/">Log Out</Link></li>
				</React.Fragment>
			:
				<React.Fragment>
					<li><a href={ site.login }>Log In</a></li>
					<li><a href={ site.register }>Register</a></li>
				</React.Fragment>
			}
		</ul>
	</header>
}

const mapStateToProps = state => {
	return {
		user: state.user.data,
	};
};

export default connect( mapStateToProps )( PageHeader );
