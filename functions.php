<?php

require_once( __DIR__ . '/inc/form-handlers.php' );

add_theme_support( 'title-tag' );

show_admin_bar( false );
add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'broker-authentication', get_stylesheet_directory_uri() . '/style.css' );
});

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

	return $args;
}, 10, 2);

add_action( 'parse_request', function( WP $wp ) {

	if ( $wp->matched_rule !== 'apps/?$' ) {
		return;
	}

	$wp->query_vars['post_status'] = 'any';

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
	return site_url( '/register/' );
} );
