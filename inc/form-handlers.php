<?php

add_action( 'init', function() {

	if ( ! $_POST['ba-action'] ) {
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

		case 'add-application':
			ba_add_application_form_handler( $data );
			break;
	}
});

function ba_register_form_handler() {
	check_admin_referer( 'ba-register' );
}

function ba_add_application_form_handler( $data ) {
	check_admin_referer( 'ba-add-application' );

	// Create the consumer
	$data = array(
		'name' => wp_filter_post_kses( $data['application_name'] ),
		'description' => wp_filter_post_kses( $data['application_description'] ),
		'meta' => array(
			'callback' => $data['application_callback_url'],
		),
	);

	$consumer = WP_REST_OAuth1_Client::create( $data );

	if ( ! is_wp_error( $consumer ) ) {
		wp_safe_redirect( get_permalink( $consumer->ID ), 303 );
		exit;
	}

	global $ba_error_message;
	$ba_error_message = $consumer->get_error_message();
}

function ba_edit_application_form_handler( $data ) {

	check_admin_referer( 'ba-edit-application' );
	global $ba_error_message;

	$consumer = WP_REST_OAuth1_Client::get( absint( $data['application_id'] ) );

	if ( is_wp_error( $consumer ) ) {
		return $ba_error_message = $consumer->get_error_message();
	}

	// Create the consumer
	$data = array(
		'name' => wp_filter_post_kses( $data['application_name'] ),
		'description' => wp_filter_post_kses( $data['application_description'] ),
		'meta' => array(
			'callback' => $data['application_callback_url'],
		),
	);

	$result = $consumer->update( $data );

	if ( is_wp_error( $result ) ) {
		$ba_error_message = $result->get_error_message();
	}
}
