<?php
get_header();

$print_rating = function ( $num ) {
	$content = '';
	for ( $i = 0; $i < 5; $i++ ) {
		$content .= '<span class="dashicons dashicons-star-filled"></span>';
	}
	return $content;
};
?>

<h1>Apps</h1>

<?php get_template_part( 'parts/app-grid' ) ?>

<?php get_footer() ?>
