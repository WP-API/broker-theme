<?php

require_once( __DIR__ . '/inc/form-handlers.php' );

add_theme_support( 'title-tag' );

show_admin_bar( false );
add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'broker-authentication', get_stylesheet_directory_uri() . '/style.css' );
});

register_nav_menu( 'masthead-links', 'Additional Links for Homepage Masthead' );

/**
 * Make the json_consumer post type viewable on the front end.
 */
add_filter( 'register_post_type_args', function( $args, $post_type ) {
	if ( $post_type !== 'json_consumer' ) {
		return $args;
	}

	$args['publicly_queryable'] = true;
	$args['has_archive'] = true;
	$args['rewrite'] = array( 'slug' => 'apps', 'with_front' => true );
	$args['query_var'] = true;
	$args['capability_type'] = 'json_consumer';

	return $args;
}, 10, 2);

add_action( 'parse_request', function( WP $wp ) {

	if ( $wp->matched_rule !== 'apps/?$' ) {
		return;
	}

	if ( ! is_user_logged_in() ) {
		wp_safe_redirect( home_url() );
		exit;
	}

	$wp->query_vars['post_status'] = 'any';
	$wp->query_vars['author'] = get_current_user_id();

	// Never throw a 404 for no posts found on this page.
	add_filter( 'pre_handle_404', function() {
		return true;
	} );
});

add_rewrite_rule( 'apps/add-new/?$', 'index.php?app=add-new', 'top' );
add_rewrite_rule( 'profile/?$', 'index.php?page=profile', 'top' );
add_rewrite_rule( 'register/?$', 'index.php?page=profile', 'top' );

add_action( 'parse_request', function( WP $wp ) {

	$template_files = array(
		'apps/add-new/?$' => get_stylesheet_directory() . '/add-new-application.php',
		'profile/?$' => get_stylesheet_directory() . '/profile.php',
		'register/?$' => get_stylesheet_directory() . '/register.php',
	);

	if ( in_array( $wp->matched_rule, array_keys( $template_files ) ) ) {
		require_once $template_files[ $wp->matched_rule ];
		exit;
	}
});

add_filter( 'register_url', function() {
	return home_url( '/register/' );
} );

add_filter( 'map_meta_cap', function( $caps, $cap, $user_id, $args ) {

	switch ( $cap ) {
		case 'edit_post':
		case 'edit_json_consumer':
			$id = $args[0];
			$post = get_post( $args[0] );
			if ( $post->post_type === 'json_consumer' && (int) $post->post_author === $user_id ) {
				return array();
			}
			break;
	}

	return $caps;
}, 10, 4 );

add_action( 'init', function() {
	if ( ! isset( $_GET['ba-action'] ) ) {
		return;
	}

	global $wp_query;

	switch ( $_GET['ba-action'] ) {
		case 'regenerate-app-secret':
			if ( ! wp_verify_nonce( $_GET['_wpnonce'], 'regenerate-secret' ) ) {
				wp_die( 'Failed nonce check.' );
			}

			if ( ! current_user_can( 'edit_json_consumer', absint( $_GET['consumer'] ) ) ) {
				wp_die( 'You are not allowed to do this.' );
			}
			$consumer = WP_REST_OAuth1_Client::get( absint( $_GET['consumer'] ) );

			if ( is_wp_error( $consumer ) ) {
				wp_die( $consumer->get_error_message() );
			}

			$result = $consumer->regenerate_secret();

			if ( is_wp_error( $consumer ) ) {
				wp_die( $consumer->get_error_message() );
			}

			wp_safe_redirect( get_permalink( $consumer->ID ) );
			break;
	}
});
