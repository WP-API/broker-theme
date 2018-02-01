<?php

namespace AppRegistry\Data;

use AppRegistry\API\App_Controller;
use WP_REST_Posts_Controller;
use WP_REST_Request;

function get_script_data() {
	global $wp_query;
	$server = rest_get_server();
	$current_path = trim( explode( '?', $_SERVER['REQUEST_URI'] )[0], '/' );

	return [
		'site' => [
			'name'     => get_bloginfo( 'name' ),
			'url'      => site_url(),
			'home'     => home_url(),
			'api'      => rest_url(),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'login'    => wp_login_url( '/' ),
			'register' => wp_registration_url(),
			'menus' => [
				'primary' => get_menu_data( 'primary' ),
			],
		],
		'archives' => [
			$current_path => array_map( function ( $post ) { return $post->ID; }, $wp_query->posts ),
		],
		'posts' => get_post_data(),
		'user'  => get_user_data(),
		// 'tinymce' => _WP_Editors::parse_settings(),
	];
}

function get_menu_data( $location ) {
	$locations = get_nav_menu_locations();
	if ( ! isset( $locations[ $location ] ) ) {
		return null;
	}

	$items = wp_get_nav_menu_items( $locations[ $location ] );

	// Walk and get a threaded array.
	$walker = new Array_Walker_Nav_Menu();
	$threaded = $walker->walk( $items, 0, [] );

	// Build data to pass back.
	$format_item = function ( $item ) use ( &$format_item ) {
		$data = [
			'id'    => $item['id'],
			'title' => $item['title'],
			'href'  => $item['url'],
			'items' => [],
		];
		if ( ! empty( $item['children'] ) ) {
			$data['items'] = array_map( $format_item, $item['children'] );
		}
		return $data;
	};
	$data = array_map( $format_item, $threaded );
	return $data;
}

function get_post_data() {
	$query = $GLOBALS['wp_query'];
	$data = [];

	$server = rest_get_server();
	$request = new WP_REST_Request();
	$post_controller = new WP_REST_Posts_Controller( 'post' );
	$page_controller = new WP_REST_Posts_Controller( 'page' );
	$app_controller = new App_Controller( 'oauth2_client' );
	foreach ( $query->posts as $post ) {
		switch ( $post->post_type ) {
			case 'post':
				$response = $post_controller->prepare_item_for_response( $post, $request );
				break;

			case 'page':
				$response = $page_controller->prepare_item_for_response( $post, $request );
				break;

			case 'oauth2_client':
				$response = $app_controller->prepare_item_for_response( $post, $request );
				break;

			default:
				continue;
		}

		if ( ! $response || is_wp_error( $response ) || $response->is_error() ) {
			continue;
		}

		$data[] = $server->response_to_data( $response, true );
	}

	return $data;
}

function get_user_data() {
	$server = rest_get_server();
	$request = new WP_REST_Request( 'GET', '/wp/v2/users/me' );
	$request['context'] = 'edit';
	$response = rest_do_request( $request );
	if ( $response->is_error() ) {
		return null;
	}

	return $server->response_to_data( $response, false );
}
