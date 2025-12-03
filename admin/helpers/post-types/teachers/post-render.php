<?php

defined('ABSPATH') || exit;

register_block_type('theme/block-test', [
  'render_callback' => 'render_teachers_block',
] );


function render_teachers_block( $attributes ) {
  $ids = $attributes['selectedTeachers'] ?? [];

  if ( empty( $ids ) ) {
    return '';
  }

  // Параметры
  $columns        = $attributes['columns'] ?? 3;
  $show_image     = $attributes['showImage'] ?? true;
  $show_position  = $attributes['showPosition'] ?? true;
  $show_desc      = $attributes['showDescription'] ?? true;

  // Берём преподавателей в порядке ID
  $posts = get_posts([
    'post_type'      => 'teachers',
    'post__in'       => $ids,
    'orderby'        => 'post__in',
    'posts_per_page' => -1,
  ]);

  ob_start();
?>
  <div class="block-standard block-08">
    <div class="container">
      <?php foreach ( $posts as $post ):
        $meta_position = get_post_meta( $post->ID, 'position', true );
        $meta_excerpt = get_post_meta( $post->ID, 'custom_excerpt', true );
        $meta_is_button_off = get_post_meta( $post->ID, 'is_button_off', true );
      ?>
        <div class="teacher-article">
          <?php
            if(has_post_thumbnail($post->ID)) {
              echo theme_get_responsive_thumbnail($post->ID, 'full', [ 'class' => 'teacher-image' ]);
            } else {
              echo '<img src="data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==" alt="MGUBS" class="teacher-image" />';
            }
          ?>
          <div class="teacher-title"><?php echo get_the_title($post->ID); ?></div>
          <?php if($meta_position) : ?><div class="teacher-descr"><?php echo nl2br( esc_html($meta_position) ); ?></div><?php endif; ?>
          <?php if($meta_excerpt) : ?><div class="teacher-description" style="display: none;"><?php echo nl2br( esc_html($meta_excerpt) ); ?></div><?php endif; ?>
          <?php if($meta_is_button_off): ?><div class="teacher-link">Подробнее</div><?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
    <a href="#" class="btn btn-white">Все новости</a>
  </div>
<?php
  return ob_get_clean();
}
