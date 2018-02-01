<?php

namespace AppRegistry\API;

use WP\OAuth2\Client;
use WP_REST_Posts_Controller;

class App_Controller extends WP_REST_Posts_Controller {
	public function create_item( $request ) {
		$response = parent::create_item( $request );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$data = (array) $response->get_data();

		// Ensure we have a secret.
		update_post_meta(
			$data['id'],
			Client::CLIENT_SECRET_KEY,
			wp_slash( wp_generate_password( Client::CLIENT_SECRET_LENGTH, false ) )
		);

		return $response;
	}

	protected function prepare_item_for_database( $request ) {
		$prepared_post = parent::prepare_item_for_database( $request );
		if ( is_wp_error( $prepared_post ) ) {
			return $prepared_post;
		}

		// Is this a new post?
		if ( ! $prepared_post->ID ) {
			// Generate the client ID.
			$prepared_post->post_name = wp_generate_password( Client::CLIENT_ID_LENGTH, false );
		}

		return $prepared_post;
	}

	public function get_item_schema() {
		$schema = parent::get_item_schema();

		// Remove useless fields.
		unset( $schema['properties']['parent'] );
		unset( $schema['properties']['password'] );
		unset( $schema['properties']['template'] );

		// Make slug a bit more hidden.
		$schema['properties']['slug']['context'] = [ 'edit' ];

		// Add sticky.
		$schema['properties']['sticky'] = array(
			'description' => __( 'Whether or not the object should be treated as sticky.' ),
			'type'        => 'boolean',
			'context'     => array( 'view', 'edit' ),
		);

		return $schema;
	}

	public function get_collection_params() {
		$params = parent::get_collection_params();

		// Remove useless params.
		unset( $params['parent'] );
		unset( $params['slug'] );

		return $params;
	}
}
