<?php

namespace AppRegistry\Authorization;

use WP\OAuth2\Client;

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\maybe_add_capabilities', 20 );
}

function get_roles() {
	$post_object = get_post_type_object( Client::POST_TYPE );

	return [
		'developer' => [
			'name' => 'Developer',
			'extends' => 'subscriber',
			'capabilities' => [
				$post_object->cap->create_posts,
				$post_object->cap->edit_posts,
			],
		],
	];
}

function maybe_add_capabilities() {
	$did_change = false;
	$desired = get_roles();

	foreach ( $desired as $role => $options ) {
		$existing = get_role( $role );
		$caps = [];
		if ( $options['extends'] ) {
			$parent = get_role( $options['extends'] );
			$caps = array_keys( array_filter( $parent->capabilities ) );
		}

		$caps = array_merge( $caps, $options['capabilities'] );
		$caps = array_unique( $caps );

		$caps = array_combine( $caps, array_fill( 0, count( $caps ), true ) );

		if ( ! $existing ) {
			$role_obj = add_role( $role, $options['name'], $caps );
			$did_change = true;
		} else {
			// diff the capabilities
		}
	}

	$user_id = get_current_user_id();
	if ( $did_change ) {
		// Reload the current user object.
		$GLOBALS['current_user'] = null;
		wp_set_current_user( $user_id );
	}
}
