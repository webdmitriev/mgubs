<?php
/*
 * Template Name: Gutenberg
*/

$url = get_template_directory_uri();

get_header();
the_content();
?>

<div class="block-standard block-17">
  <!-- owner-slider-with-dots owner-slider-with-arrows -->
  <div class="slider-items block-17-slider-items-js owner-slider">
    <img src="<?= $url; ?>/assets/img/slider/slide-01.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
    <img src="<?= $url; ?>/assets/img/slider/slide-02.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
    <img src="<?= $url; ?>/assets/img/slider/slide-03.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
    <img src="<?= $url; ?>/assets/img/slider/slide-04.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
    <img src="<?= $url; ?>/assets/img/slider/slide-05.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
    <img src="<?= $url; ?>/assets/img/slider/slide-06.jpg" alt="alto" class="slider-item owner-slide slide show-popup-gallery" />
  </div>
</div>

<div style="display: block; height: 200vh;"></div>

<?php
get_footer();