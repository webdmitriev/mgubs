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
  <div class="container">
    <?php
      $arg_cat = array(
        'orderby'      => 'name',
        'order'        => 'ASC',
        'hide_empty'   => 1,
        'exclude'      => array(1),
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
          <div class="block-title" id="<?= $cat->slug; ?>" style="margin-bottom: 16px;"><h2 class="h2 underline"><?= $cat->name; ?></h2></div>
          <div class="article-posts">
            <?php while ( $query->have_posts() ) : $query->the_post();
              $id = get_the_ID();

              get_template_part( 'inc/post', null,
                array(
                  'id'                  => get_the_ID(),
                  'tags'                => get_the_tags($id),
                  'title'               => get_the_title($id),
                  'is_logotype'         => get_post_meta(get_the_ID(), 'is_logotype', true),
                  'is_logotype_special' => get_post_meta(get_the_ID(), 'is_logotype_special', true),
                  'image'               => get_post_thumbnail_id($id),
                  'link'                => get_permalink($id),
                  'date'                => format_date_russian(get_post_meta(get_the_ID(), 'date_start', true))
                )
              );

            endwhile; wp_reset_postdata(); ?>
          </div>
    <?php endif; } } ?>
  </div>
</section>
<!-- Post Section (end) -->

<?php
get_footer();