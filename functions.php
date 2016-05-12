<?php

require_once( __DIR__ . '/inc/form-handlers.php' );


function ba_add_error( $message ) {
	add_action( 'ba_error_message', function () use ( $message ) {
		echo esc_html( $message );
	});
}

function ba_add_success( $message ) {
	add_action( 'ba_success_message', function () use ( $message ) {
		echo esc_html( $message );
	});
}

add_theme_support( 'title-tag' );

add_action( 'init', function () {
	show_admin_bar( current_user_can( 'manage_options' ) );
});

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
add_rewrite_rule( 'activate/?$', 'index.php?page=profile', 'top' );

add_action( 'parse_request', function( WP $wp ) {

	$template_files = array(
		'apps/add-new/?$' => get_stylesheet_directory() . '/add-new-application.php',
		'profile/?$' => get_stylesheet_directory() . '/profile.php',
		'register/?$' => get_stylesheet_directory() . '/register.php',
		'activate/?$' => get_stylesheet_directory() . '/activate.php',
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


/**
 * Alter the login redirect for non-super-admins.
 *
 * @param string $redirect_to The redirect destination URL.
 * @param string $requested_redirect_to The requested redirect destination URL passed as a parameter.
 * @param WP_User|WP_Error $user WP_User object if login was successful, WP_Error object otherwise.
 * @return string
 */
add_action( 'login_redirect', function( $redirect_to, $requested_redirect_to, $user ) {
	// Only alter for valid users.
	if ( is_wp_error( $user ) ) {
		return $redirect_to;
	}
	// Only alter if it was the default.
	if ( ! empty( $requested_redirect_to ) && $requested_redirect_to !== admin_url() ) {
		return $redirect_to;
	}
	// Super-admins can do what they want.
	if ( is_super_admin() ) {
		return $redirect_to;
	}
	// Non-super-admin, change to the unauthorized URL.
	return home_url( '/apps/' );
}, 10, 3 );

/**
 * Hook into the activate user to copy the meta from signup into the user's meta.
 */
add_action( 'wpmu_activate_user', function( $user_id, $password, $meta ) {
	if ( ! empty( $meta['display_name'] ) ) {
		wp_update_user( wp_slash( array(
			'ID'           => $user_id,
			'nickname'     => $meta['display_name'],
			'display_name' => $meta['display_name'],
		)));
	}
}, 10, 3 );

/**
 * Add some extra place holder vars to the welcome email so we
 * can use them in the network admin.
 */
add_filter( 'update_welcome_user_email', function( $email, $user_id, $password, $meta ) {

	$user = get_userdata( $user_id );

	$email = str_replace(
		array( 'DISPLAY_NAME', 'EMAIL' ),
		array( $user->display_name, $user->user_email ),
		$email
	);
	var_dump($meta);
	return $email;
}, 10, 4 );

/**
 * As we have a custom wp-activate.php route, we have to override the email on signup.
 */
add_filter( 'site_url', function( $url, $path ) {
	if ( strpos( $path, 'wp-activate.php?key' ) !== 0 ) {
		return $url;
	}

	return str_replace( 'wp-activate.php', 'activate/', $url );
}, 10, 2 );

add_filter( 'retrieve_password_message', function( $message ) {
	return str_replace( network_site_url( 'wp-login.php' ), site_url( 'wp-login.php' ), $message );
});

add_filter( 'retrieve_password_title', function() {
	$blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
	return sprintf( __( '[%s] Password Reset' ), $blogname );
});

add_filter( 'network_site_url', function( $url, $path, $scheme ) {
	if ( ! is_multisite() ) {
		return $url;
	}

	$current_site = get_current_site();
	return str_replace( set_url_scheme( 'http://' . $current_site->domain . $current_site->path, is_ssl() ? 'https' : 'http' ), site_url( '/' ), $url );
}, 10, 3 );
