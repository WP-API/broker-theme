<?php

namespace AppRegistry\API;

use WP\OAuth2\Client;
use WP_Post;
use WP_REST_Request;

function bootstrap() {
	add_filter( 'register_post_type_args', __NAMESPACE__ . '\\alter_post_type', 10, 2 );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\register_controllers' );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\register_fields' );
}

/**
 * Make the client post type viewable on the front end.
 */
function alter_post_type( $args, $post_type ) {
	if ( $post_type !== Client::POST_TYPE ) {
		return $args;
	}

	$overrides = [
		'public'                => true,
		'show_in_admin'         => false,
		'show_in_rest'          => true,
		'rest_controller_class' => App_Controller::class,
		'rest_base'             => 'apps',
		'has_archive'           => true,
		'query_var'             => true,
		// 'rewrite'            => false,
		'rewrite'               => [
			'slug'       => 'apps',
			'with_front' => true,
		],
	];
	$args = array_merge( $args, $overrides );

	$args['supports'][] = 'excerpt';
	$args['supports'][] = 'thumbnail';

	return $args;
}

/**
 * Register custom controllers.
 */
function register_controllers() {
	$auth_controller = new Authentication_Controller();
	$auth_controller->register_routes();
}

/**
 * Register additional fields.
 */
function register_fields() {
	register_rest_field(
		Client::POST_TYPE,
		'redirect_uris',
		[
			'get_callback'    => __NAMESPACE__ . '\\get_redirect_uris_field',
			'update_callback' => __NAMESPACE__ . '\\update_redirect_uris_field',
			'schema'          => [
				'context' => [ 'edit' ],
				'type'    => 'array',
				'items'   => [
					'type' => 'string',
				],
			],
		]
	);
	register_rest_field(
		Client::POST_TYPE,
		'client_type',
		[
			'get_callback'    => __NAMESPACE__ . '\\get_client_type_field',
			'update_callback' => __NAMESPACE__ . '\\update_client_type_field',
			'schema'          => [
				'context' => [ 'edit' ],
				'type'    => 'string',
				'enum'    => [
					'public',
					'private',
				],
			],
		]
	);
}

/**
 * Get the `redirect_uris` field.
 *
 * @param string $data Data being returned in the response.
 * @param string $field Field ID.
 * @param WP_REST_Request $request Request object.
 * @return array|null List of redirect URIs (or null if wrong context)
 */
function get_redirect_uris_field( $data, $field, WP_REST_Request $request ) {
	if ( $request['context'] !== 'edit' ) {
		return null;
	}

	$client = Client::get_by_post_id( (int) $data['id'] );
	return (array) $client->get_redirect_uris();
}

/**
 * Update the `redirect_uris` field.
 *
 * @param array $value Value being updated.
 * @param WP_Post $post Post being updated.
 */
function update_redirect_uris_field( $value, WP_Post $post ) {
	update_post_meta( $post->ID, Client::REDIRECT_URI_KEY, $value );
}

/**
 * Get the `client_type` field.
 *
 * @param string $data Data being returned in the response.
 * @param string $field Field ID.
 * @param WP_REST_Request $request Request object.
 * @return array|null List of redirect URIs (or null if wrong context)
 */
function get_client_type_field( $data, $field, WP_REST_Request $request ) {
	if ( $request['context'] !== 'edit' ) {
		return null;
	}

	$client = Client::get_by_post_id( (int) $data['id'] );
	return $client->get_type();
}

/**
 * Update the `client_type` field.
 *
 * @param array $value Value being updated.
 * @param WP_Post $post Post being updated.
 */
function update_client_type_field( $value, WP_Post $post ) {
	update_post_meta( $post->ID, Client::TYPE_KEY, $value );
}
