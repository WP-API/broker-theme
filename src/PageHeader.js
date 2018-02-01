import React from 'react';
import { connect } from 'react-redux';

import Link from './Link';

import './PageHeader.css';

function PageHeader( props ) {
	const { site } = window.AppRegistryData;
	const { user, userLoading } = props;

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
			{ userLoading ?
				<li>Loading…</li>
			: (
				user ?
					<React.Fragment>
						<li><Link href="/apps/mine/">My Apps</Link></li>
						<li><Link href="/profile/">{ user.name }</Link></li>
					</React.Fragment>
				:
					<React.Fragment>
						<li><Link href="/login/">Log In</Link></li>
						<li><a href={ site.register }>Register</a></li>
					</React.Fragment>
			) }
		</ul>
	</header>
}

const mapStateToProps = state => {
	return {
		userLoading: state.user.loading,
		user: state.user.data,
	};
};

export default connect( mapStateToProps )( PageHeader );
