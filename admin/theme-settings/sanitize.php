<?php
defined('ABSPATH') || exit;

function theme_settings_init() {

  // Основные настройки темы
  register_setting('theme_settings_group', 'theme_settings', 'theme_settings_sanitize');

  // Выбранные новости
  register_setting('theme_featured_posts_group', 'theme_featured_posts', 'theme_featured_posts_sanitize');
}
add_action('admin_init', 'theme_settings_init');


function theme_settings_sanitize($input) {
  $sanitized_input = [];

  // Соцсети
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

  // Описание футера
  if (isset($input['footer_description'])) {
    $sanitized_input['footer_description'] = sanitize_textarea_field($input['footer_description']);
  }

  // Образовательная программа для футера
  if (isset($input['footer_edu_program'])) {
    $sanitized_input['footer_edu_program'] = sanitize_text_field($input['footer_edu_program']);
  }

  // Логотип
  if (isset($input['site_logo'])) {
    $sanitized_input['site_logo'] = intval($input['site_logo']);
  }

  // Логотип
  if (isset($input['is_logotype'])) {
    $sanitized_input['is_logotype'] = intval($input['is_logotype']);
  }

  // Логотип
  if (isset($input['is_logotype_special'])) {
    $sanitized_input['is_logotype_special'] = intval($input['is_logotype_special']);
  }


  // Яндекс.Метрика
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


// Санитизация списка новостей
function theme_featured_posts_sanitize($input) {
  if (!is_array($input)) return [];
  return array_map('intval', $input);
}


// Вывод Метрики в <head>
function add_yandex_metric_to_head() {
  $options = get_option('theme_settings');
  if (!empty($options['yandex_metric'])) {
    echo "<!-- Яндекс.Метрика -->\n";
    echo $options['yandex_metric'];
    echo "\n<!-- /Яндекс.Метрика -->\n";
  }
}
add_action('wp_head', 'add_yandex_metric_to_head');
