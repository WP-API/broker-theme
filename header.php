<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<?php wp_head() ?>
	</head>
	<body <?php body_class() ?>>
		<header>
			<h2>
				<img src="<?php echo get_stylesheet_directory_uri() ?>/images/wordpress-logo.png" width="25" />
				<a href="<?php echo home_url() ?>">Application Registry</a>
			</h2>

			<ul class="user-links">
				<li><a href="http://v2.wp-api.org/">API Documentation</a></li>
				<?php if ( is_user_logged_in() ) : ?>
					<li><a href="<?php echo home_url( '/apps/' ) ?>">Apps</a></li>
					<li><a href="<?php echo home_url( '/profile/' ) ?>"><?php echo esc_html( wp_get_current_user()->display_name ) ?></a></li>
					<li><a href="<?php echo wp_logout_url( home_url() ) ?>">Log Out</a></li>
				<?php else : ?>
					<li><a href="<?php echo wp_login_url( home_url( '/apps/' ) ) ?>">Log In</a></li>
					<li><a href="<?php echo wp_registration_url(); ?> ">Register</a></li>
				<?php endif ?>
			</ul>
		</header>
		<div class="wrapper">
			<?php if ( has_action( 'ba_error_message' ) ): ?>
				<div class="message error">
					<?php do_action( 'ba_error_message' ) ?>
				</div>
			<?php endif ?>

			<?php if ( has_action( 'ba_success_message' ) ): ?>
				<div class="message success">
					<?php do_action( 'ba_success_message' ) ?>
				</div>
			<?php endif ?>
