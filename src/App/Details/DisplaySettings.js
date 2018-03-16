import React from 'react';

import Form from '../../Form';

export default class DisplaySettings extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			type: 'web',
			url: props.app.meta.url,
		};
	}

	onSubmit = e => {
		e.preventDefault();

		this.props.onSave( {
			id:   this.props.app.id,
			meta: {
				type: this.state.type,
				url: this.state.url,
			}
		} );
	}

	render() {
		// const { type } = this.state;

		return <div className="App_Edit">
			<h2>Display Settings</h2>
			<p>These settings affect how your app is displayed on the directory.</p>
			<Form onSubmit={ this.onSubmit }>
				{/*
				<div className="">
					<label>App Type</label>
					<div>
						<label>
							<input
								checked={ type === 'web' }
								name="type"
								type="radio"
								onChange={ e => this.setState( { type: 'web' } ) }
							/>
							Web
						</label>
						<label>
							<input
								checked={ type === 'mobile' }
								name="type"
								type="radio"
								onChange={ e => this.setState( { type: 'mobile' } ) }
							/>
							Mobile
						</label>
						<label>
							<input
								checked={ type === 'desktop' }
								name="type"
								type="radio"
								onChange={ e => this.setState( { type: 'desktop' } ) }
							/>
							Desktop
						</label>
					</div>
				</div>

				<h3>Header Buttons</h3>
				<p>We'll autodetect and display the correct buttons based on the visitor's device.</p>
				{ type === 'mobile' ?
					<React.Fragment>
						<div>
							<label>iOS App Store URL</label>
							<input
								type="url"
							/>
						</div>
						<div>
							<label>Google Play Store URL</label>
							<input
								type="url"
							/>
						</div>
					</React.Fragment>
				: type === 'desktop' ?
					<React.Fragment>
						<div>
							<label>macOS Download URL</label>
							<input
								type="url"
							/>
						</div>
						<div>
							<label>Windows Download URL</label>
							<input
								type="url"
							/>
						</div>
						<div>
							<label>Linux Download URL</label>
							<input
								type="url"
							/>
						</div>
					</React.Fragment>
				: null }
				*/}

				<div>
					<label>Website URL</label>
					<input
						type="url"
						value={ this.state.url }
						onChange={ e => this.setState( { url: e.target.value } ) }
					/>
				</div>

				<button className="Button" type="submit">Save</button>
			</Form>
		</div>
	}
}
