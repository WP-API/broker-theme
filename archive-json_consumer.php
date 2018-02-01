<?php get_header(); ?>

<h1>Legacy Apps</h1>

<div class="message error">
	<p><strong>Warning:</strong> Legacy applications will cease to be usable after <strong>Dec 1, 2018</strong>.</p>
	<p>See <a href="">the migration guide</a> for information on how to migrate your existing apps.</p>
</div>

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
	<a href="<?php echo home_url( '/apps/add-new/' ) ?>">Add New Application</a>
</div>
<?php get_footer() ?>
