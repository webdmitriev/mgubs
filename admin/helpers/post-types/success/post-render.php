<?php

defined('ABSPATH') || exit;

register_block_type('theme/block-41', [
  'render_callback' => 'render_success_block',
] );

function render_success_block( $attributes ) {
  $ids = $attributes['selectedPosts'] ?? [];

  if ( empty( $ids ) ) {
    return '';
  }

  // Параметры
  $anchor = $attributes['anchor'] ?? false;
  $bgc = $attributes['bgc'] ?? false;

  // Берём преподавателей в порядке ID
  $posts = get_posts([
    'post_type'      => 'success',
    'post__in'       => $ids,
    'orderby'        => 'post__in',
    'posts_per_page' => -1,
  ]);

  ob_start();
?>
  <div class="block-standard block-41" id="<?php echo esc_html($anchor); ?>" style="background-color: <?php echo $bgc ? esc_html($bgc) : 'transparent'; ?>">
    <div class="container">
      <?php foreach ( $posts as $post ): ?>
        <a href="<?php the_permalink($post->ID); ?>" class="block-item">
          <div class="block-item__bg">
            <?php
              if(has_post_thumbnail($post->ID)) { echo theme_get_responsive_thumbnail($post->ID, 'full', []); }
              else { echo '<img src="data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==" alt="MGUBS" class="img" />'; }
            ?>
          </div>
          <h3 class="h3"><?php echo get_the_title($post->ID); ?></h3>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}
