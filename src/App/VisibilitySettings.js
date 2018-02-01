import React from 'react';

import Button from '../Button';
import Form from '../Form';
import InputList from '../Form/InputList';

import './VisibilitySettings.css';

const conditions = [
	{
		message:  'App has long description',
		check:    app => app.content.rendered.length > 0,
		required: true,
	},
	{
		message:  'One or more valid callback URIs',
		check:    app => app.redirect_uris.length > 0,
		required: true,
	},

	{
		message: 'App has app icon',
		check:   app => !! app.featured_image,
	},
	{
		message: 'App has banner',
		check:   app => false,
	}
];

export default class VisibilitySettings extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			uris: [],
		};
	}

	render() {
		const { app } = this.props;
		const { uris } = this.state;

		const status = conditions.map( condition => {
			return {
				...condition,
				status: condition.check( app ),
			};
		} );
		const ready = status
			.filter( condition => condition.required )
			.reduce( ( status, condition ) => status && condition.status, true );

		switch ( app.status ) {
			case 'publish2':
				return <div>
					<p>Your app is currently public and listed on the directory.</p>
					<p>To delist your app and disable any future applications, hit the big scary button below.</p>
					<Button>Delist my app</Button>
				</div>;

			default:
				return <div>
					<p>Your app is currently in development mode (private).</p>

					<Form>
						<div>
							<label>Domain Whitelist</label>
							<div>
								<InputList
									max={ 3 }
									type="text"
									value={ uris }
									onChange={ uris => this.setState( { uris } ) }
								/>
								<span class="description">You can whitelist up to three sites to connect to while developing.</span>
							</div>
						</div>
						<Button>Save</Button>
					</Form>

					<h3>Submit for Publication</h3>
					<p>Ready to list your app publicly? Complete the checklist below and submit for approval. We'll review it in the next few days.</p>
					<ul className="VisibilitySettings-checklist">
						{ status.map( ( condition, idx ) =>
							<li key={ idx }>
								<span
									role="img"
									aria-label={ condition.status ? 'Pass' : 'Fail' }
								>
									{ condition.status ? '✅' : '❌' }
								</span>

								{ condition.message }
								{ condition.required ?
									<strong> (required)</strong>
								: null }
							</li>
						) }
					</ul>
					<Button
						disabled={ ! ready }
					>
						Submit for Approval
					</Button>
				</div>;
		}
	}
}
