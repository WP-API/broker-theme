<?php

$result = wpmu_activate_signup( $_GET['key'] );

if ( is_wp_error( $result ) ) {
	ba_add_error( $result->get_error_message() );
} else {
	$user = get_userdata( $result['user_id'] );
}

?><?php get_header(); ?>

<?php if ( ! is_wp_error( $result ) ) : ?>
	<h1><?php _e('Your account is now active!'); ?></h1>
	<div class="content">
		<p><span class="h3"><?php _e('Email:'); ?></span> <?php echo esc_html( $user->user_email ) ?></p>
		<p><span class="h3"><?php _e('Password:'); ?></span> <?php echo $result['password']; ?></p>
		<p class="view"><?php printf( __('Your account is now activated. <a href="%1$s">Log in</a> or go back to the <a href="%2$s">homepage</a>.' ), site_url('wp-login.php', 'login'), home_url() ); ?></p>
	</div>
<?php endif ?>
<?php get_footer() ?>
