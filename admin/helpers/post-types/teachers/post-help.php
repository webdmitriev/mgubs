<?php

defined('ABSPATH') || exit;

// Шорткод [teachers_block ids="1,2,3" buttonControl=""]
function register_block_teachers() {
  register_block_type('theme/block-08', [
    'render_callback' => 'render_teachers_block'
  ]);
}
add_action('init', 'register_block_teachers');

function render_teachers_block($attributes) {
  $ids = $attributes['teachersOrder'] ?? [];
  $button = $attributes['buttonControl'] ?? '';

  if (empty($ids)) {
    return '<p>Преподаватели не выбраны.</p>';
  }

  // 👉 Получаем ссылки
  $links = defaultLinks();

  // 👉 Ищем ссылку по названию
  $teachersLink = '';
  foreach ($links as $link) {
    if ($link['name'] === 'Все преподаватели') {
      $teachersLink = $link['link'];
      break;
    }
  }

  $query = new WP_Query([
    'post_type' => 'teachers',
    'post__in'  => array_map('intval', $ids),
    'orderby'   => 'post__in',
  ]);

  ob_start();

  // твоя HTML разметка
  ?>
  <div class="block-standard block-08">
    <div class="container">
      <?php while ($query->have_posts()): $query->the_post();

        $post_id = get_the_ID();

        $title = get_the_title();
        $position = get_post_meta($post_id, 'position', true);
        $excerpt = get_post_meta($post_id, 'custom_excerpt', true);
        $is_button_off = get_post_meta($post_id, 'is_button_off', true);
      ?>
        <div class="teacher-article">
          <?php
            if( has_post_thumbnail() ):
              echo theme_get_responsive_thumbnail($post_id, 'full', [
                'class' => 'teacher-image'
              ]);
            else: ?>
            <img src="data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==" alt="MGU" class="teacher-image" />
          <?php endif; ?>

          <div class="teacher-title"><?php echo esc_html($title); ?></div>

          <?php if ($position): ?>
            <div class="teacher-descr"><?php echo wp_kses_post($position); ?></div>
          <?php endif; ?>

          <?php if ($excerpt): ?>
            <div class="teacher-excerpt" style="display: none;"><?php echo wp_kses_post($excerpt); ?></div>
          <?php endif; ?>

          <?php if($is_button_off): ?>
            <div class="teacher-link">Подробнее</div>
          <?php endif; ?>
        </div>
      <?php endwhile; ?>
    </div>

    <?php if ($button === "teachers-more"): ?>
      <button class="btn btn-white teachers-more">Показать ещё</button>
    <?php elseif ($button === "teachers-all" && $teachersLink): ?>
      <a href="<?php echo esc_url($teachersLink); ?>" class="btn btn-white">Все преподаватели</a>
    <?php endif; ?>
  </div>
  <?php

  wp_reset_postdata();
  return ob_get_clean();
}