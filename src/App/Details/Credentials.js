import React from 'react';

import Button from '../../Button';
import Form from '../../Form';

export default class Credentials extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			confirming: false,
			confirmText: '',
		}
	}

	onRegenerate = () => {
		this.props.onSave( {
			id:     this.props.app.id,
			secret: 'regenerate',
		} );
		this.setState( {
			confirming: false,
			confirmText: '',
		} );
	}

	render() {
		const { app } = this.props;
		const { confirming, confirmText } = this.state;

		return <div className="oauth-credentials">
			<h2>OAuth Credentials</h2>
			<Form>
				<div>
					<div>
						Client Key
					</div>
					<div>
						<code>{ app.slug }</code>
					</div>
				</div>
				<div>
					<div>
						Client Secret
					</div>
					<div>
						<code>{ app.secret }</code>
					</div>
				</div>
				<div>
					<div>
						Regenerate Secret
					</div>
					{ confirming ?
						<div>
							<p>Enter your Client Key to regenerate the secret.</p>
							<input
								type="text"
								value={ confirmText }
								onChange={ e => this.setState( { confirmText: e.target.value } ) }
							/>
							<Button
								disabled={ confirmText !== app.slug }
								onClick={ this.onRegenerate }
							>
								Confirm Regeneration
							</Button>
							<span className="description">Warning: Regenerating the secret will invalidate all connections.</span>
						</div>
					:
						<div>
							<Button
								onClick={ () => this.setState( { confirming: true } ) }
							>
								Regenerate Secret
							</Button>
							<span className="description">Warning: Regenerating the secret will invalidate all connections.</span>
						</div>
					}
				</div>
			</Form>
		</div>;
	}
}
