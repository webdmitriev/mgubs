<?php

defined('ABSPATH') || exit;

register_block_type('theme/block-40', [
  'render_callback' => 'render_admission_block',
] );

function render_admission_block( $attributes ) {
  $ids = $attributes['selectedPosts'] ?? [];

  if ( empty( $ids ) ) {
    return '';
  }

  // Параметры
  $anchor = $attributes['anchor'] ?? false;
  $bgc = $attributes['bgc'] ?? false;

  // Берём преподавателей в порядке ID
  $posts = get_posts([
    'post_type'      => 'admissions',
    'post__in'       => $ids,
    'orderby'        => 'post__in',
    'posts_per_page' => -1,
  ]);

  ob_start();
?>
  <div class="block-standard block-40" id="<?php echo esc_html($anchor); ?>" style="background-color: <?php echo $bgc ? esc_html($bgc) : 'transparent'; ?>">
    <div class="container">
      <?php foreach ( $posts as $post ):
        $post_obj = get_post($post->ID);
        $file_id = get_post_meta( $post->ID, 'admission_file', true );
      ?>
        <div class="block-content">
          <h3 class="h3"><?php echo get_the_title($post->ID); ?></h3>
          <?php if ($post_obj): ?><div class="descr"><?php echo apply_filters('the_content', $post_obj->post_content); ?></div><?php endif; ?>
          <?php
            if ( $file_id ) {
              $file_url = wp_get_attachment_url( $file_id );
              if ( $file_url ) {
                ?>
                  <a href="<?php echo esc_url( $file_url ); ?>" class="link-download" download>Скачать</a>
                <?php
              }
            }
          ?>
          <div class="descr block-content__date"><?php echo get_the_date('j F Y'); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}
