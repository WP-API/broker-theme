import React from 'react';

import AppCard from '../AppCard';
import Button from '../Button';
import Editor from '../Editor';
import Form from '../Form';
import InputList from '../Form/InputList';

import './AppSettings.css';

export default class AppSettings extends React.Component {
	constructor( props ) {
		super( props );

		const { app } = props;
		this.state = {
			title:       app ? app.title.raw : '',
			description: app ? app.excerpt.raw : '',
			content:     app ? app.content.raw : '',
			type:        app ? app.client_type : 'public',
			uris:        app ? app.redirect_uris : [],
		};
	}

	onSave( e ) {
		e.preventDefault();

		const { app } = this.props;
		this.props.onSave( {
			id:            app ? app.id : null,
			title:         this.state.title,
			excerpt:       this.state.description,
			content:       this.state.content,
			client_type:   this.state.type,
			redirect_uris: this.state.uris,
		} );
	}

	render() {
		const { error, saving, user } = this.props;
		const { content, description, title, type, uris } = this.state;

		const appForPreview = {
			...( this.props.app || {} ),
			excerpt: {
				text: description,
			},
			title: {
				rendered: title,
			}
		};
		if ( ! this.props.app ) {
			appForPreview._embedded = {};
			appForPreview._embedded.author = [ user ];
		}

		return <Form onSubmit={ e => this.onSave( e ) }>
			<div>
				<label>Application Name</label>
				<div>
					<input
						type="text"
						value={ title }
						onChange={ e => this.setState( { title: e.target.value } ) }
					/>
					<span className="description">This is shown to users during authorization and in their profile.</span>
				</div>
			</div>
			<div>
				<label>Description</label>
				<div>
					<textarea
						rows="2"
						value={ description }
						onChange={ e => this.setState( { description: e.target.value } ) }
					/>
					<span className="description">Short description, shown in the directory and during authorization.</span>
				</div>
			</div>
			<div>
				<div>Preview</div>
				<div className="AppSettings-preview">
					<AppCard app={ appForPreview } />
				</div>
			</div>
			<div>
				<label>Long Description</label>
				<div>
					<Editor
						initialValue={ content }
						onChange={ content => this.setState( { content } ) }
					/>
					<span className="description">This description is shown in the directory only. Not required for private apps.</span>
				</div>
			</div>
			<div>
				<label>Callback URL</label>
				<div>
					<InputList
						type="url"
						value={ uris }
						onChange={ uris => this.setState( { uris } ) }
					/>

					<span className="description">Your application's callback URIs. The callback passed with the request token must match the scheme, host, port, and path of this URL.</span>
				</div>
			</div>
			<div>
				<label>Redirect Type</label>
				<div>
					<label>
						<input
							checked={ type === 'private' }
							name="redirect_type"
							type="radio"
							value="private"
							onChange={ e => this.setState( { type: e.target.value } ) }
						/>
						Private
					</label>
					<span className="description">Clients capable of maintaining confidentiality of credentials, such as server-side applications.</span>
					<label>
						<input
							checked={ type === 'public' }
							name="redirect_type"
							type="radio"
							value="public"
							onChange={ e => this.setState( { type: e.target.value } ) }
						/>
						Public
					</label>
					<span className="description">Clients incapable of keeping credentials secret, such as browser-based applications or desktop and mobile apps</span>
				</div>
			</div>

			{ error ?
				<p>{ error.message } (<code>{ error.code }</code>)</p>
			: null }

			<Button
				disabled={ saving }
				submit
			>{ saving ? 'Saving…' : 'Save' }</Button>
		</Form>;
	}
}
