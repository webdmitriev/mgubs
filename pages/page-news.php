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

$arg_cat = array(
  'orderby'      => 'name',
  'order'        => 'ASC',
  'hide_empty'   => 1,
  'exclude'      => array(1),
  'include'      => '',
);
$categor = get_categories( $arg_cat );

?>

<div class="block-standard block-39">
  <div class="container">
    <h1 class="h1">Новости</h1>
  </div>
</div>

<!-- block-13-breadcrumbs (start) -->
<?php if( $categor ): ?>
<div class="wp-block-theme-block-12 block-standard block-12" id="varfjtbnfxch" style="background-color:#ffffff">
  <div class="container df-ce-st">
    <div class="breadcrumbs-prev" style="display: none;">
      <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.207839 8.08022L5.80562 14.7527C6.08274 15.0824 6.51504 15.0824 6.79216 14.7527C7.06928 14.4231 7.06928 13.9088 6.79216 13.5791L1.68211 7.5L6.79216 1.42088C7.06928 1.09121 7.06928 0.576922 6.79216 0.247252C6.51504 -0.0824184 6.08274 -0.0824185 5.80562 0.247252L0.207839 6.90659C-0.069279 7.23626 -0.0692791 7.76373 0.207839 8.08022Z" fill="#333"></path>
      </svg>
    </div>
    <div class="breadcrumbs scroll-line-none">
      <?php foreach( $categor as $cat ) {
        $arg_posts = array(
          'posts_per_page' => -1,
          'cat' => $cat->cat_ID,
        );
        $query = new WP_Query($arg_posts);
      ?>
        <a href="#<?php echo $cat->slug; ?>" class="breadcrumb ancLinks"><?php echo $cat->name; ?></a>
      <?php } ?>
    </div>
    <div class="breadcrumbs-next" style="display: none;">
      <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.79216 6.91978L1.19438 0.247253C0.91726 -0.0824177 0.484956 -0.0824177 0.207839 0.247253C-0.0692794 0.576923 -0.0692793 1.09121 0.207839 1.42088L5.3179 7.5L0.207841 13.5791C-0.0692771 13.9088 -0.069277 14.4231 0.207841 14.7527C0.484959 15.0824 0.917263 15.0824 1.19438 14.7527L6.79216 8.09341C7.06928 7.76374 7.06928 7.23626 6.79216 6.91978Z" fill="#333"></path></svg>
    </div>
  </div>
</div>
<?php endif; ?>
<!-- block-13-breadcrumbs (end) -->

<div style="width: 100%;height: 24px;"></div>

<!-- Post Section (start) -->
<section class="articles pos-r w-100p pt-24 pb-24">
  <div class="container">
    <?php
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