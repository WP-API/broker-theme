<?php get_header(); ?>

<h1>Apps</h1>

<?php if ( have_posts() ) : ?>
	<table class="apps-list content">
		<?php while ( have_posts() ) : the_post() ?>
			<tr>
				<td class="app-name">
					<a href="<?php the_permalink() ?>"><?php the_title() ?></a>
					<?php echo esc_html( get_post_meta( get_the_id(), 'key', true ) ) ?>
				</td class="app-status">
				<td>
					<?php echo get_post_status() ?>
				</td>
			</tr>
		<?php endwhile ?>
	</table>
<?php else: ?>

<?php endif ?>

<div class="add-new">
	<a href="<?php echo site_url( '/apps/add-new/' ) ?>">Add New Application</a>
</div>
<?php get_footer() ?>
