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
    $options = get_option('theme_settings', []);
    $selected = $options['featured_posts'] ?? [];

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
        if ($post) {
            $posts[] = $post;
        }
    }

    // Применяем limit
    if ($atts['limit'] && is_numeric($atts['limit'])) {
        $posts = array_slice($posts, 0, intval($atts['limit']));
    }

    ob_start();
    ?>

    <div class="featured-posts">
        <?php foreach ($posts as $post):
            $thumb = get_the_post_thumbnail_url($post->ID, 'medium');
            if (!$thumb) {
                $thumb = get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg';
            }
        ?>
            <article class="featured-post-item">
                <?php if ($atts['show_thumb'] === 'yes'): ?>
                    <a href="<?php echo get_permalink($post->ID); ?>" class="featured-post-thumb">
                        <img src="<?php echo esc_url($thumb); ?>" alt="">
                    </a>
                <?php endif; ?>

                <div class="featured-post-content">
                    <h3 class="featured-post-title">
                        <a href="<?php echo get_permalink($post->ID); ?>">
                            <?php echo esc_html($post->post_title); ?>
                        </a>
                    </h3>

                    <p class="featured-post-excerpt">
                        <?php echo esc_html(wp_trim_words($post->post_content, 20)); ?>
                    </p>
                </div>
            </article>
        <?php endforeach; ?>
    </div>

    <style>
        .featured-posts {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .featured-post-item {
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }
        .featured-post-thumb img {
            width: 120px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
        }
        .featured-post-title {
            margin: 0 0 10px;
            font-size: 18px;
        }
        .featured-post-title a {
            text-decoration: none;
            color: inherit;
        }
    </style>

    <?php
    return ob_get_clean();
}
add_shortcode('featured_posts', 'theme_featured_posts_shortcode');
