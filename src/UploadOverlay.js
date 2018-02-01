import React from 'react';

import './UploadOverlay.css'

const INITIAL_STATE = { dropping: false };

export default class UploadOverlay extends React.PureComponent {
	constructor( props ) {
		super( props );

		this.state = { ...INITIAL_STATE };
	}

	onDragOver( e ) {
		e.preventDefault();

		// Explicitly show this is a copy.
		e.dataTransfer.dropEffect = 'copy';

		this.setState( { dropping: true } );
	}

	onDragLeave( e ) {
		e.preventDefault();

		this.setState( { dropping: false } );
	}

	onDrop( e ) {
		e.preventDefault();

		// If there's no files, ignore it.
		if ( ! e.dataTransfer.files.length ) {
			this.setState( { dropping: false } );
			return;
		}

		const file = e.dataTransfer.files[0];
		this.setState( { dropping: false } );
		this.props.onUpload( file );
	}

	onCancel() {
		this.setState( { ...INITIAL_STATE } );
		this.props.onCancel();
	}

	render() {
		const { dropping } = this.state;

		return <div
			className={ `UploadOverlay ${ dropping ? 'dropping' : ''}` }
			onDragOver={ e => this.onDragOver( e ) }
			onDragLeave={ e => this.onDragLeave( e ) }
			onDrop={ e => this.onDrop( e ) }
		>
			<label>
				<input
					type="file"
					onChange={ e => this.props.onUpload( e.target.files[0] ) }
				/>
				<span className="dashicons dashicons-upload"></span>
				<span className="screen-reader-text">Edit</span>
			</label>
		</div>;
	}
}
