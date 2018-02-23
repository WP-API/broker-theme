import React from 'react';

import Header from './Header';
import Installer from './Installer';

const NAME = window.AppRegistryData.site.name;

export default function Error( props ) {
	const error = window.AppRegistryConnectError || {};
	const details = <details>
		<summary>Developer Details</summary>
		<dl>
			<dt>Client ID</dt>
			<dd>{ error.params.client_id || <em>No ID provided</em> }</dd>
			<dt>Error message</dt>
			<dd>{ error.message }</dd>
			<dt>Error code</dt>
			<dd><code>{ error.code }</code></dd>
			<dt>Parameters</dt>
			<dd><pre>{ JSON.stringify( error.params, null, '\t' ) }</pre></dd>
		</dl>
	</details>;

	switch ( error.code ) {
		case 'oauth2.broker.server.no_broker':
		case 'oauth2.broker.server.old_broker':
			console.log( error );
			return <article>
				<Header />
				<h1>Install the App Connect plugin</h1>
				<Installer
					params={ error.params }
					site={ error.site }
				/>
			</article>;

		case 'oauth2.broker.server.invalid_params':
			return <article>
				<Header />
				<h1>Invalid connection request</h1>
				<p>{ NAME } was unable to connect: One or more parameters were invalid.</p>
				<p>If you are the developer of this application, please ensure your parameters are valid.</p>
				{ details }
			</article>;

		case 'oauth2.broker.server.missing_params':
			return <article>
				<Header />
				<h1>Invalid connection request</h1>
				<p>{ NAME } was unable to connect: One or more parameters were missing.</p>
				<p>If you are the developer of this application, please ensure your parameters are valid.</p>
				{ details }
			</article>;

		case 'oauth2.broker.server.invalid_client':
			return <article>
				<Header />
				<h1>Invalid connection request</h1>
				<p>{ NAME } was unable to connect: The client ID is invalid.</p>
				<p>If you are the developer of this application, please ensure your client ID is correct.</p>
				{ details }
			</article>;

		case 'oauth2.broker.server.invalid_site':
		default:
			return <article>
				<Header />
				<h1>Could not connect to your site</h1>
				<p>Unfortunately, there was an error connecting to your site: { error.message || 'Unknown error' }</p>
				<p>This error has been reported, and we'll look into it. Sorry for the inconvenience.</p>
				{ details }
			</article>;
	}
}
