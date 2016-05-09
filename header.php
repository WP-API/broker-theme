<?php global $ba_error_message, $ba_success_message ?><!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<?php wp_head() ?>
	</head>
	<body <?php body_class() ?>>
		<header>
			<h2><img src="<?php echo get_stylesheet_directory_uri() ?>/images/wordpress-logo.png" width="25" /> <a href="<?php echo site_url() ?>">Application Registry</a></h2>
			<div class="user-links">
				<a href="http://v2.wp-api.org/">API Documentation</a>
				<?php if ( is_user_logged_in() ) : ?>
					<a href="<?php echo site_url( '/apps/' ) ?>">Apps</a>
					<a href="<?php echo site_url( '/profile/' ) ?>"><?php echo esc_html( wp_get_current_user()->display_name ) ?></a>
					<a href="<?php echo wp_logout_url( site_url() ) ?>">Log Out</a>
				<?php else : ?>
					<a href="<?php echo wp_login_url( site_url( '/apps/' ) ) ?>">Log In</a>
					<a href="<?php echo wp_registration_url(); ?> ">Register</a>
				<?php endif ?>
			</div>
		</header>
		<div class="wrapper">
			<?php if ( $ba_error_message ) : ?>
				<div class="message error">
					<?php echo esc_html( $ba_error_message ); ?>
				</div>
			<?php endif ?>

			<?php if ( $ba_success_message ) : ?>
				<div class="message success">
					<?php echo esc_html( $ba_success_message ); ?>
				</div>
			<?php endif ?>
