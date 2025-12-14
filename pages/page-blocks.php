<?php
/*
 * Template Name: Blocks
*/

$url = get_template_directory_uri();

get_header();
?>

<div class="block-standard block-17">
  <div class="slider-items">
    <img src="<?= $url; ?>/assets/img/slider/slide-01.jpg" alt="alto" class="slider-item" />
    <img src="<?= $url; ?>/assets/img/slider/slide-02.jpg" alt="alto" class="slider-item" />
    <img src="<?= $url; ?>/assets/img/slider/slide-03.jpg" alt="alto" class="slider-item" />
    <img src="<?= $url; ?>/assets/img/slider/slide-04.jpg" alt="alto" class="slider-item" />
    <img src="<?= $url; ?>/assets/img/slider/slide-05.jpg" alt="alto" class="slider-item" />
    <img src="<?= $url; ?>/assets/img/slider/slide-06.jpg" alt="alto" class="slider-item" />
  </div>
</div>

<?php
get_footer();