<?php

defined('ABSPATH') || exit;

// Регистрация и санитизация
function theme_settings_init() {
  register_setting('theme_settings_group', 'theme_settings', 'theme_settings_sanitize');
}
add_action('admin_init', 'theme_settings_init');

function theme_settings_sanitize($input) {
  $sanitized_input = [];

  // Санитизация контактной информации
  if (isset($input['contact_info'])) {
    $sanitized_input['contact_info'] = [
      'phone' => sanitize_text_field($input['contact_info']['phone']),
      'email' => sanitize_email($input['contact_info']['email']),
    ];
  }

  // Санитизация партнеров
  if (isset($input['partners'])) {
    $sanitized_input['partners'] = [];
    foreach ($input['partners'] as $partner) {
      if (!empty($partner['text'])) {
        $sanitized_input['partners'][] = [
          'text' => sanitize_text_field($partner['text']),
          'link' => esc_url_raw($partner['link']),
        ];
      }
    }
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