<?php
/*
 * Template Name: news
*/


get_header();

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';
$logotypeMGU_270 = $url.'/assets/img/logotype-270.svg';

$home_url = esc_url( home_url( '/' ) );
$en = 'https://en.mgubs.ru/';
$en_text = 'More';
$ru = 'https://mgubs.ru/';
$ru_text = 'Подробнее';

$categories = get_categories( [
	'taxonomy'     => 'category',
	'type'         => 'post',
	'child_of'     => 0,
	'parent'       => '',
	'orderby'      => 'name',
	'order'        => 'ASC',
	'hide_empty'   => 1,
	'hierarchical' => 1,
	'exclude'      => '',
	'include'      => '',
	'number'       => 0,
	'pad_counts'   => false,
] );

?>

<!-- Main magcommon (start) -->
<section style="height: 80px;">
</section>
<!-- Main magcommon (end) -->

<!-- block-13-breadcrumbs (start) -->

<!-- block-13-breadcrumbs (end) -->

<!-- Post Section (start) -->
<section class="articles pos-r w-100p pt-24 pb-24">
  <div class="container-rubber">
    <?php
      $arg_cat = array(
        'orderby'      => 'name',
        'order'        => 'ASC',
        'hide_empty'   => 1,
        'exclude'      => '',
        'include'      => '',
      );
      $categor = get_categories( $arg_cat );

      if( $categor ) { foreach( $categor as $cat ) {
        $arg_posts = array(
          'posts_per_page' => -1,
          'cat' => $cat->cat_ID,
        );
        $query = new WP_Query($arg_posts);

        if ($query->have_posts() ) : ?>
          <div class="pos-r d-block w-100p mb-24" id="<?= $cat->slug; ?>"><h2 class="h2 d-block w-100p"><span><?= $cat->name; ?></span><div class="wrap-title__line" style="background-color: #ff762f"></div></h2></div>
          <div class="articles-items df-fs-st gap-24 w-100p mb-24">
            <?php while ( $query->have_posts() ) : $query->the_post();
              $id = get_the_ID();

              echo get_the_title($id);

              // get_template_part( 'old-template/blocks/articles/post', null,
              //   array(
              //     'tags' => get_the_tags( $id ),
              //     'title' => get_the_title($id),
              //     'logotype' => $url.'/assets/img/item-image-logo-news1.svg',
              //     'logo_boolean' => get_field( 'post_event_logotype', $id ),
              //     'logo_boolean_270' => get_field( 'post_event_logotype_270', $id ),
              //     'image' => has_post_thumbnail($id) ? get_the_post_thumbnail_url($id) : get_template_directory_uri().'/old-template/blocks/image/default-image.png',
              //     'link' => get_permalink($id),
              //     'day' => get_field( 'post_event_day', $id ),
              //     'month' => get_field( 'post_event_month', $id ),
              //     'year' => get_field( 'post_event_year', $id ),
              //     'descr' => get_field( 'post_event_descr', $id )
              //   )
              // );

            endwhile; wp_reset_postdata(); ?>
          </div>
    <?php endif; } } ?>
  </div>
</section>
<!-- Post Section (end) -->

<?php
get_footer();