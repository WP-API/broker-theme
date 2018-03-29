import qs from 'qs';
import React from 'react';

import Button from '../Button';

const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 600;

export default class Installer extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			installing: false,
			rechecking: false,
		};
	}

	onOpen = e => {
		const { site } = this.props;
		const url = `${ site.url }/wp-admin/plugin-install.php?tab=search&type=term&s=connect`;

		const top = ( window.innerHeight - WINDOW_HEIGHT ) / 2;
		const left = ( window.innerWidth - WINDOW_WIDTH ) / 2;
		const args = [
			`width=${ WINDOW_WIDTH }`,
			`height=${ WINDOW_HEIGHT }`,
			`top=${ top }`,
			`left=${ left }`,
		];
		window.open( url, '_blank', args.join( ',' ) );

		this.setState( { installing: true } );
	}

	onRecheck = () => {
		this.setState( { rechecking: true } );

		const params = {
			...this.props.params,
			_envelope: 'true',

			// Bust the cache.
			_: Date.now(),
		};
		const url = `/wp-json/broker/v2/connect?${ qs.stringify( params ) }`;

		const options = {
			mode: 'same-origin',
			credentials: 'same-origin',
			redirect: 'manual',
		};

		fetch( url )
			.then( resp => {
				if ( ! resp.ok ) {
					throw new Error( 'Connection error' );
				}

				return resp.json();
			} )
			.then( data => {
				if ( data.status === 302 ) {
					const location = data.headers.Location;
					window.location = location;
					console.log( location );
					return;
				}

				console.log( data );
				this.setState( { rechecking: false } );
				throw new Error( data.body.message );
			})
			.catch( err => {
				console.log( err );
			} );
	}

	render() {
		const { site } = this.props;
		const { installing, rechecking } = this.state;

		if ( installing ) {
			return <React.Fragment>
				<p>Opening plugin install window…</p>
				<p>Once you have activated the App Connect plugin, click the button below to try again.</p>
				<Button
					disabled={ rechecking }
					onClick={ this.onRecheck }
				>
					<i className="dashicons dashicons-update" />
					{ rechecking ? 'Rechecking…' : 'Recheck Site' }
				</Button>
			</React.Fragment>;
		}

		return <React.Fragment>
			<p>Found your site <strong>{ site.name }</strong>.</p>
			<p>We're almost ready to connect, but before we can, you need to install the App Connect plugin.</p>
			<Button onClick={ this.onOpen }>Install &rarr;</Button>
		</React.Fragment>;
	}
}
