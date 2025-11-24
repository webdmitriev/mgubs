<?php

defined('ABSPATH') || exit;

// Шорткоды для вывода данных
function theme_phone_shortcode() {
  $phone = get_theme_phone();
  return $phone ? '<a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a>' : '';
}
add_shortcode('theme_phone', 'theme_phone_shortcode');

function theme_email_shortcode() {
  $email = get_theme_email();
  return $email ? '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>' : '';
}
add_shortcode('theme_email', 'theme_email_shortcode');

function theme_partners_shortcode() {
  $partners = get_theme_partners();
  if (empty($partners)) return '';

  $output = '<div class="theme-partners">';
  foreach ($partners as $partner) {
    $output .= '<div class="partner-item">';
    if (!empty($partner['link'])) $output .= '<a href="' . esc_url($partner['link']) . '" target="_blank" rel="noopener">';
    $output .= esc_html($partner['text']);
    if (!empty($partner['link'])) $output .= '</a>';
    $output .= '</div>';
  }
  $output .= '</div>';

  return $output;
}
add_shortcode('theme_partners', 'theme_partners_shortcode');

// Шорткод: выводит избранные посты из theme_settings[featured_posts]
function theme_featured_posts_shortcode($atts) {
  $selected = get_option('theme_featured_posts', []);

  if (empty($selected)) {
    return '<div class="featured-posts">Нет выбранных новостей.</div>';
  }

  // Настройки шорткода (опционально)
  $atts = shortcode_atts([
    'show_thumb' => 'yes',
    'limit' => 0,
  ], $atts);

  $posts = [];

  foreach ($selected as $id) {
    $post = get_post($id);
    if ($post) { $posts[] = $post; }
  }

  // Применяем limit
  if ($atts['limit'] && is_numeric($atts['limit'])) {
    $posts = array_slice($posts, 0, intval($atts['limit']));
  }

  ob_start();
  ?>

  <div class="article-posts">
    <?php foreach ($posts as $post):
      $thumb = get_the_post_thumbnail_url($post->ID, 'medium');
      $descr = get_post_meta($post->ID, 'custom_excerpt', true);
      $date_info = format_date_russian(get_post_meta($post->ID, 'date_start', true));
      ?>
      <a href="<?php echo get_permalink($post->ID); ?>" class="article-post">
        <?php
          if (!$thumb) {
            $thumb = get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg';
            echo '<img src="' . esc_url($thumb) . '" alt="" class="article-news__img" />';
          } else {
            echo theme_get_responsive_thumbnail($post->ID, 'full', [
              'class' => 'article-news__img'
            ]);
          }
        ?>

        <?php if ($descr): ?>
          <p class="descr article-news__descr"><?php echo esc_html(wp_trim_words($descr, 60)); ?></p>
        <?php endif; ?>

        <?php if ($date_info): ?>
          <p class="descr article-news__date"><?php echo esc_html($date_info['day']); ?> <?php echo esc_html($date_info['month_russian']); ?> <?php echo esc_html($date_info['year']); ?></p>
        <?php endif; ?>
      </a>
    <?php endforeach; ?>
  </div>

  <?php
  return ob_get_clean();
}
add_shortcode('featured_posts', 'theme_featured_posts_shortcode');
