<?php

defined('ABSPATH') || exit;

register_block_type('theme/block-09', [
  'render_callback' => 'render_course_block',
] );
// post-render-course

function render_course_block( $attributes ) {
  $ids = $attributes['selectedPosts'] ?? [];

  if ( empty( $ids ) ) {
    return '';
  }

  // Берём преподавателей в порядке ID
  $posts = get_posts([
    'post_type'      => 'page',
    'post__in'       => $ids,
    'orderby'        => 'post__in',
    'posts_per_page' => -1,
  ]);

  ob_start();
?>
  <div class="block-standard block-09">
    <div class="container">
      <?php foreach ( $posts as $post ):
        $date_info = format_date_russian(get_post_meta($post->ID, 'date_start', true));
      ?>
        <a href="<?php the_permalink(); ?>" class="program-article">
          <div class="program-article__image df-fs-fe">
            <?php echo theme_get_responsive_thumbnail($post->ID, 'full'); ?>
            <h3 class="h3"><?php echo esc_html(get_the_title($post->ID)); ?></h3>
          </div>
          <?php if ($date_info) : ?>
            <div class="program-article__date" style="color: var(--black-color);">
              <?php echo esc_html($date_info['day']); ?>
              <?php echo esc_html($date_info['month_russian']); ?>
              <?php echo esc_html($date_info['year']); ?>
            </div>
          <?php endif; ?>
          <div class="link">Подробнее</div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}
