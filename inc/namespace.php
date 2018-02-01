<?php

namespace AppRegistry;

use WP\OAuth2\Client;

/**
 * Register actions and filters.
 */
function bootstrap() {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup' );

	add_action( 'show_admin_bar', function () {
		return current_user_can( 'manage_options' );
	} );

	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_assets' );
	// add_action( 'wp_footer', 'wp_enqueue_editor', 0 );
	add_action( 'wp_footer', function () {
		if ( ! class_exists( '_WP_Editors', false ) ) {
			require( ABSPATH . WPINC . '/class-wp-editor.php' );
		}
		\_WP_Editors::print_tinymce_scripts();
	}, 0 );
	add_action( 'widgets_init', __NAMESPACE__ . '\\register_sidebars_and_widgets' );

	API\bootstrap();
	Routing\bootstrap();
}

/**
 * Set up theme actions and support.
 */
function setup() {
	add_theme_support( 'title-tag' );
	register_nav_menu( 'primary', 'Primary Navigation' );
	register_nav_menu( 'masthead-links', 'Additional Links for Homepage Masthead' );
}

/**
 * Enqueue scripts and styles.
 */
function enqueue_assets() {
	// Automatic thumbnails.
	// TODO: generate server-side instead
	wp_enqueue_script( 'geopattern', 'https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js', [ 'jquery' ], 'null' );
	wp_add_inline_script( 'geopattern', 'jQuery( function ( $ ) {
		$( ".AppCard-image" ).each( function () {
			var pattern = GeoPattern.generate( this.dataset.title );
			this.style.backgroundImage = pattern.toDataUrl();
		} );
	} );' );

	wp_enqueue_style( 'app-registry-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans' );

	$opts = [
		'handle' => 'app-registry',
		'scripts' => [
			'utils',
		],
		'styles' => [
			'dashicons',
			'app-registry-fonts',
			'editor-buttons',
		],
	];
	Loader\enqueue_assets( dirname( __DIR__ ), $opts );

	wp_localize_script( 'app-registry', 'AppRegistryData', Data\get_script_data() );
}

/**
 * Get the action being performed on the app.
 *
 * @return string|null Action if available, null otherwise.
 */
function get_app_action() {
	if ( ! is_singular( Client::POST_TYPE ) ) {
		return null;
	}

	$var = get_query_var( Routing\ACTION_VAR );
	if ( empty( $var ) ) {
		return null;
	}

	return $var;
}

/**
 * Register sidebars and widgets.
 */
function register_sidebars_and_widgets() {
	register_sidebar( [
		'name' => 'App Details Sidebar',
		'id'   => 'app-details-sidebar',
	] );

	register_widget( __NAMESPACE__ . '\\Widgets\\Rating' );
}
