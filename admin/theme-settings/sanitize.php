<?php
// admin/theme-settings/sanitize.php
defined('ABSPATH') || exit;

// Регистрация и санитизация
function theme_settings_init() {
  register_setting('theme_settings_group', 'theme_settings', 'theme_settings_sanitize');
}
add_action('admin_init', 'theme_settings_init');

function theme_settings_sanitize($input) {
  $sanitized_input = [];

  // 🧩 Социальные сети
  if (isset($input['social'])) {
    $sanitized_input['social'] = [];
    foreach ($input['social'] as $social) {
      if (!empty($social['icon']) && !empty($social['link'])) {
        $sanitized_input['social'][] = [
          'icon' => sanitize_text_field($social['icon']),
          'link' => esc_url_raw($social['link']),
        ];
      }
    }
  }

  // Санитизация текстовых полей (footer_description)
  if (isset($input['footer_description'])) {
    $sanitized_input['footer_description'] = sanitize_textarea_field($input['footer_description']);
  }

  // Featured posts selection
  if (isset($input['featured_posts'])) {
    $sanitized_input['featured_posts'] = array_map('intval', $input['featured_posts']);
  }

  // Санитизация Яндекс.Метрики
  if (isset($input['yandex_metric'])) {
    $sanitized_input['yandex_metric'] = wp_kses($input['yandex_metric'], [
      'script' => [
        'src' => [],
        'async' => [],
        'defer' => [],
        'type' => [],
        'charset' => [],
        'id' => [],
        'data-counter' => []
      ],
      'noscript' => [],
      'img' => [
        'src' => [],
        'width' => [],
        'height' => [],
        'alt' => [],
        'style' => []
      ],
      'meta' => [
        'name' => [],
        'content' => []
      ]
    ]);
  }

  return $sanitized_input;
}


// Добавление Яндекс.Метрики перед закрывающим тегом </head>
function add_yandex_metric_to_head() {
  $options = get_option('theme_settings');
  if (!empty($options['yandex_metric'])) {
    echo "<!-- Яндекс.Метрика -->\n";
    echo $options['yandex_metric'];
    echo "\n<!-- /Яндекс.Метрика -->\n";
  }
}
// Используем хук wp_head с низким приоритетом, чтобы вывести в конце
add_action('wp_head', 'add_yandex_metric_to_head');