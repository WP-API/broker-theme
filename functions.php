<?php

namespace AppRegistry;

if ( ! class_exists( 'WP\\OAuth2\\Client' ) ) {
	trigger_error( 'Missing Connect plugin.', E_WARNING );
	add_action( 'admin_notices', function () {
		echo '<div class="error"><p>Connect plugin is required for the App Registry theme.</p></div>';
	} );
	return;
}

require __DIR__ . '/legacy/oauth1.php';

require __DIR__ . '/inc/api/namespace.php';
require __DIR__ . '/inc/api/class-app-controller.php';
require __DIR__ . '/inc/api/class-authentication-controller.php';
require __DIR__ . '/inc/authorization/namespace.php';
require __DIR__ . '/inc/namespace.php';
require __DIR__ . '/inc/data/class-array-walker-nav-menu.php';
require __DIR__ . '/inc/data/namespace.php';
require __DIR__ . '/inc/loader/namespace.php';
require __DIR__ . '/inc/routing/namespace.php';

bootstrap();
