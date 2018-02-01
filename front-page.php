<?php get_header() ?>

<div class="Home">
	<div class="Masthead">
		<p>Unlock the power of the WordPress REST API.</p>

		<form class="Masthead-search">
			<input
				placeholder="Find an app…"
				type="search"
			/>
			<button
				type="submit"
			>
				<i class="dashicons dashicons-search"></i>
				<span class="screen-reader-text">Search</span>
			</button>
		</form>

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

	<h2>Featured Apps</h2>
	<div class="AppGrid">
		<?php

		// Loop the sticky apps.
		while ( have_posts() ) {
			the_post();
			if ( ! is_sticky() ) {
				break;
			}

			get_template_part( 'parts/app-card' );
		}

		?>
	</div>

	<h2>Newest Apps</h2>
	<?php get_template_part( 'parts/app-grid' ) ?>
	<a href="#">See all</a>
</div>

<?php get_footer() ?>
