<?php
get_header();

the_post();

// var_dump( AppRegistry\get_app_action() );
?>

<?php get_template_part( 'parts/app-details' ) ?>

<?php get_footer() ?>
