<?php get_header(); the_post(); ?>


	<div class="masthead">
		<p>This site is a central application registry (&ldquo;broker&rdquo;) for WordPress REST API applications using OAuth 1.</p>

		<nav>
			<?php if ( is_user_logged_in() ) : ?>
				<a href="<?php echo home_url( '/apps/' ) ?>">View your Applications</a>
			<?php else : ?>
				<a href="<?php echo wp_login_url( home_url( '/apps/' ) ) ?>">Log In to Register Applications</a>
			<?php endif ?>
		</nav>

		<?php wp_nav_menu( array(
			'menu'        => 'masthead-links',
			'fallback_cb' => false,
			'container'   => false,
			'menu_class'  => 'additional',
		)) ?>
	</div>

<div class="content">
	<?php the_content() ?>
</div>

<?php get_footer() ?>
