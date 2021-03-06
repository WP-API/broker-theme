<?php

add_action( 'init', function() {

	if ( empty( $_POST['ba-action'] ) ) {
		return;
	}

	$data = wp_unslash( $_POST );
	switch ( $_POST['ba-action'] ) {
		case 'register':
			ba_register_form_handler( $data );
			break;

		case 'edit-application':
			ba_edit_application_form_handler( $data );
			break;

		case 'delete-application':
			ba_delete_application_form_handler( $data );
			break;

		case 'add-application':
			ba_add_application_form_handler( $data );
			break;

		case 'update-profile':
			ba_update_profile_form_handler( $data );
			break;
	}
});

function ba_register_form_handler( $data ) {
	check_admin_referer( 'ba-register' );

	wpmu_signup_user(
		sanitize_email( $data['user_email'] ),
		sanitize_email( $data['user_email'] ),
		array(
			'display_name' => sanitize_text_field( $data['user_name'] )
		)
	);

	ba_add_success( 'Please check your email to verify your email address.' );
}

function ba_add_application_form_handler( $data ) {
	check_admin_referer( 'ba-add-application' );

	// Create the consumer
	$data = array(
		'name' => wp_kses_post( $data['application_name'] ),
		'description' => wp_kses_post( $data['application_description'] ),
		'meta' => array(
			'callback' => $data['application_callback_url'],
		),
	);

	$consumer = WP_REST_OAuth1_Client::create( $data );

	if ( ! is_wp_error( $consumer ) ) {
		wp_safe_redirect( get_permalink( $consumer->ID ), 303 );
		exit;
	}

	ba_add_error( $consumer->get_error_message() );
}

function ba_edit_application_form_handler( $data ) {

	check_admin_referer( 'ba-edit-application' );

	if ( ! current_user_can( 'edit_json_consumer', absint( $data['application_id'] ) ) ) {
		wp_die( 'You are not allowed to do this.' );
	}

	$consumer = WP_REST_OAuth1_Client::get( absint( $data['application_id'] ) );

	if ( is_wp_error( $consumer ) ) {
		ba_add_error( $consumer->get_error_message() );
		return $consumer->get_error_message();
	}

	// Create the consumer
	$data = array(
		'name' => wp_kses_post( $data['application_name'] ),
		'description' => wp_kses_post( $data['application_description'] ),
		'meta' => array(
			'callback' => $data['application_callback_url'],
		),
	);

	$result = $consumer->update( $data );

	if ( is_wp_error( $result ) ) {
		ba_add_error( $result->get_error_message() );
	} else {
		ba_add_success( 'Updated Application.' );
	}
}

function ba_delete_application_form_handler( $data ) {
	check_admin_referer( 'ba-edit-application' );

	if ( ! current_user_can( 'edit_json_consumer', absint( $data['application_id'] ) ) ) {
		wp_die( 'You are not allowed to do this.' );
	}

	$consumer = WP_REST_OAuth1_Client::get( absint( $data['application_id'] ) );

	if ( is_wp_error( $consumer ) ) {
		ba_add_error( $consumer->get_error_message() );
		return $consumer->get_error_message();
	}

	$result = $consumer->delete();

	if ( is_wp_error( $result ) ) {
		ba_add_error( $result->get_error_message() );
		return $result->get_error_message();
	}

	// Deleted, go back to apps list
	wp_safe_redirect( home_url( '/apps/' ) );
	exit;
}

function ba_update_profile_form_handler( $data ) {

	check_admin_referer( 'ba-update-profile' );

	if ( ! is_user_logged_in() ) {
		wp_die( 'You are not logged in.' );
	}

	$update = wp_update_user( wp_slash( array(
		'ID'           => get_current_user_id(),
		'display_name' => sanitize_text_field( $data['user_name'] ),
		'user_email'   => sanitize_email( $data['user_email'] ),
		'user_pass'    => $data['user_pass'],
	) ) );

	if ( is_wp_error( $update ) ) {
		ba_add_error( $update->get_error_message() );
		return false;
	}

	$user = get_current_user_id();
	global $current_user;
	$current_user = null;
	wp_set_current_user( $user ); // hack to update the global current user object.
	ba_add_success( 'Your details have been updated.' );

	if ( ! empty( $data['user_pass'] ) ) {
		wp_set_auth_cookie( get_current_user_id(), false, is_ssl() );
	}
}
