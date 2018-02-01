<?php

namespace AppRegistry\Routing;

use WP\OAuth2\Client;
use WP_Post;
use WP_Query;

const ACTION_VAR = 'appregistry_action';
const AUTHOR_VAR = 'appregistry_author';
const ID_TAG = '%oauth2_client_id%';

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\register_rewrites', 20 );
	add_filter( Client::POST_TYPE . '_rewrite_rules', __NAMESPACE__ . '\\add_additional_app_rules' );
	add_action( 'pre_get_posts', __NAMESPACE__ . '\\alter_home_query' );
	add_action( 'pre_get_posts', __NAMESPACE__ . '\\set_author_param' );
	add_filter( 'post_type_link', __NAMESPACE__ . '\\alter_permalinks', 10, 2 );
}

/**
 * Switch the home query to showing apps instead.
 *
 * @param WP_Query $query Query to alter.
 */
function alter_home_query( WP_Query $query ) {
	if ( ! $query->is_main_query() || ! $query->is_home() ) {
		return;
	}

	$query->set( 'post_type', Client::POST_TYPE );
}

/**
 * Change author=me to the current user.
 *
 * @param WP_Query $query Query to alter.
 */
function set_author_param( WP_Query $query ) {
	$author = $query->get( AUTHOR_VAR );
	if ( $author === 'me' ) {
		$query->set( 'author', get_current_user_id() );
	}
}

/**
 * Register rewrite rules for our apps.
 */
function register_rewrites() {
	// Remove default permastruct...
	remove_permastruct( Client::POST_TYPE );

	// Add a new permastruct using the ID instead
	add_rewrite_tag(
		ID_TAG,
		'(\d+)',
		sprintf( 'post_type=%s&p=', Client::POST_TYPE )
	);
	add_permastruct(
		Client::POST_TYPE,
		'apps/%oauth2_client_id%',
		[
			'with_front' => true,
			'ep_mask'    => EP_PAGES,
		]
	);

	// Add other routes.
	add_rewrite_rule(
		'apps/new/?$',
		sprintf( 'index.php?post_type=%s', Client::POST_TYPE ),
		'top'
	);
	add_rewrite_rule(
		'apps/mine/?$',
		sprintf( 'index.php?post_type=%s&' . AUTHOR_VAR . '=me', Client::POST_TYPE ),
		'top'
	);

	// Register query var for later use.
	global $wp;
	$wp->add_query_var( ACTION_VAR );
	$wp->add_query_var( AUTHOR_VAR );
}

/**
 * Register additional app management page rules.
 *
 * @param array $rules Rewrite rules for the app permastruct.
 * @return array
 */
function add_additional_app_rules( $rules ) {
	$base = 'apps/(\d+)';
	$match = sprintf( 'index.php?post_type=%s&p=$matches[1]', Client::POST_TYPE );

	$additional = [
		$base . '/display/?$' => $match . '&' . ACTION_VAR . '=display',
		$base . '/edit/?$' => $match . '&' . ACTION_VAR . '=edit',
	];
	return array_merge( $rules, $additional );
}

/**
 * Alter permalink to replace our rewrite tag.
 *
 * @param string  $link Generated permalink for the post.
 * @param WP_Post $post Post object.
 * @return string Altered permalink.
 */
function alter_permalinks( $link, WP_Post $post ) {
	if ( $post->post_type !== Client::POST_TYPE ) {
		return $link;
	}

	$link = str_replace( ID_TAG, $post->ID, $link );
	return $link;
}
