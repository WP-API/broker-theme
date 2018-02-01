import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import React from 'react';

import './Editor.css';

const mceInit = {
	branding: false,
	browser_spellcheck: true,
	content_css: `${ window.AppRegistryData.site.url}/wp-includes/js/tinymce/skins/wordpress/wp-content.css`,
	end_container_on_empty_block: true,
	entities: "38,amp,60,lt,62,gt",
	indent: false,
	keep_styles: false,
	menubar: false,
	plugins: [
		'hr',
		'link',
		'lists',
		'paste',
		'wordpress',
	],
	relative_urls: false,
	resize: 'vertical',
	statusbar: false,
	toolbar: [
		[
			'formatselect',
			'bold',
			'italic',
			'bullist',
			'numlist',
			'blockquote',
			'link',
			'wp_adv',
		].join( ' ' ),
		[
			'strikethrough',
			'hr',
			'forecolor',
			'pastetext',
			'removeformat',
			'charmap',
			'outdent',
			'indent',
			'undo',
			'redo'
		].join( ' ' ),
	],
	wpautop: true,

	// Link settings:
	link_title: false,
	target_list: false,
};

export default class Editor extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			mode: 'visual',
		};
	}

	render() {
		const { initialValue, onChange } = this.props;
		const { mode } = this.state;

		const tabsClass = mode === 'visual' ? 'wp-editor-tabs tmce-active' : 'wp-editor-tabs html-active';

		return <div className="Editor">
			<div className={ tabsClass }>
				<button
					className="wp-switch-editor switch-tmce"
					type="button"
					onClick={ () => this.setState( { mode: 'visual' } ) }
				>Visual</button>
				<button
					className="wp-switch-editor switch-html"
					type="button"
					onClick={ () => this.setState( { mode: 'html' } ) }
				>Text</button>
			</div>

			<div className="wp-editor-container">
				{ /*visibility: hidden; border-width: 1px; width: 100%; display: none;*/ }
				{ mode === 'visual' ?
					<TinyMCE
						initialValue={ initialValue }
						init={ mceInit }
						onChange={ e => onChange( e.target.getContent() ) }
					/>
				:
					<textarea
						className="wp-editor-area"
						cols="40"
						value={ initialValue }
						onChange={ e => onChange( e.target.value ) }
					/>
				}
			</div>
		</div>;
	}
}
