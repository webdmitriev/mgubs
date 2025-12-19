<?php
/*
 * Template Name: Development
*/


get_header();

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';
the_content();
?>

<div class="block-standard block-27">
  <div class="container">
    <!--  -->
  </div>
</div>


<?php // echo do_shortcode('[contact-form-7 id="d65f8de" title="Контактная форма 1"]'); ?>
<?php // echo do_shortcode('[featured_posts]'); ?>

<?php
get_footer();