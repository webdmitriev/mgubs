<?php

defined('ABSPATH') || exit;

register_block_type('theme/block-23', [
  'render_callback' => 'render_manager_block',
] );


function render_manager_block( $attributes ) {
  $ids = $attributes['selectedPosts'] ?? [];

  if ( empty( $ids ) ) {
    return '';
  }

  // Параметры
  $anchor = $attributes['anchor'] ?? false;
  $bgc = $attributes['bgc'] ?? false;

  // Берём преподавателей в порядке ID
  $posts = get_posts([
    'post_type'      => 'manager',
    'post__in'       => $ids,
    'orderby'        => 'post__in',
    'posts_per_page' => -1,
  ]);

  ob_start();
?>
  <div class="block-standard block-23" id="<?php echo esc_html($anchor); ?>" style="background-color: <?php echo $bgc ? esc_html($bgc) : 'transparent'; ?>">
    <div class="container content-items">
      <?php foreach ( $posts as $post ):
        $role = get_post_meta( $post->ID, 'role', true );
        $phone = get_post_meta( $post->ID, 'phone', true );
        $email = get_post_meta( $post->ID, 'email', true );
      ?>
        <div class="content-item df-fs-fs">
          <?php
            if(has_post_thumbnail($post->ID)) { echo theme_get_responsive_thumbnail($post->ID, 'full', [ 'class' => 'img' ]); }
            else { echo '<img src="data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==" alt="MGUBS" class="img" />'; }
          ?>
          <div class="descr content-item__head">
            <strong><?php echo get_the_title($post->ID); ?></strong>
            <?php if($role) { echo '<br/>' . esc_html($role); }; ?>
          </div>
          <div class="descr content-item__contacts df-fs-fs">
            <?php foreach ($phone as $value) {
              // Удаляем всё, кроме цифр
              $cleanNumber = preg_replace('/\D/', '', $value);

              // Если номер начинается с 8, заменяем на 7 (для России)
              if (substr($cleanNumber, 0, 1) == '8' && strlen($cleanNumber) > 10) {
                $cleanNumber = '7' . substr($cleanNumber, 1);
              }

              echo '<a href="tel:+'. $cleanNumber .'">' . $value . '</a>';
            } ?>
            <?php foreach ($email as $value) { echo '<a href="mailto:'. $value .'">' . $value . '</a>'; } ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}
