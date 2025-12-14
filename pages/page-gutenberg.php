<?php
/*
 * Template Name: Gutenberg
*/

$url = get_template_directory_uri();

get_header();
?><div style="display: block; height: 55px;"></div><?php
the_content();
?>

<div style="display: block; height: 200vh;"></div>

<?php
get_footer();