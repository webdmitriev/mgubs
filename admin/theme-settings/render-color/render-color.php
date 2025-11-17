<?php
defined('ABSPATH') || exit;

/**
 * Получаем выбранную цветовую схему
 */
function get_site_color_scheme() {
  $preset_key = get_option('theme_color_scheme', 'default');

  $presets = [
    'default' => [
      '--black-color' => '#171717',
      '--gray-color' => '#808080',
      '--accent-color' => '#3FBD59',
      '--bg-color' => '#EFF1F3',
      '--gradient-color' => 'linear-gradient(45deg, #4481eb 0%, #04befe 100%)',
    ],
    'orange' => [
      '--black-color' => '#171717',
      '--gray-color' => '#808080',
      '--accent-color' => '#fe6d35',
      '--bg-color' => '#FFF5F0',
      '--gradient-color' => 'linear-gradient(45deg, #FF8C42 0%, #fe6d35 100%)',
    ],
    'gray' => [
      '--black-color' => '#171717',
      '--gray-color' => '#6B7280',
      '--accent-color' => '#4B5563',
      '--bg-color' => '#F9FAFB',
      '--gradient-color' => 'linear-gradient(45deg, #6B7280 0%, #9CA3AF 100%)',
    ],
  ];

  return $presets[$preset_key] ?? $presets['default'];
}

/**
 * Вывод CSS переменных для темы
 */
function output_site_color_scheme() {
  $scheme = get_site_color_scheme();

  foreach ($scheme as $var => $val) {
    $option_name = str_replace(['--', '-'], ['', '_'], $var);
    $override = get_option($option_name);
    if ($override) {
      $scheme[$var] = $override;
    }
  }

  echo "<style id='theme-color-scheme'>:root {";
  foreach ($scheme as $var => $val) {
    echo "{$var}: {$val};";
  }
  echo "}</style>";
}
add_action('wp_head', 'output_site_color_scheme');

/**
 * Рендер иконки темы
 */
function render_theme_icon($index = 1) {
  $theme_color = get_option('theme_color_scheme', 'default');
  $allowed_colors = ['default', 'orange', 'gray'];

  if (!in_array($theme_color, $allowed_colors)) {
    $theme_color = 'default';
  }

  $option_name = sprintf('icon_%02d_%s', $index, $theme_color);
  $icon_url = get_option($option_name);

  if ($icon_url) {
    echo "<img src='{$icon_url}' class='block-item__img' alt='icon'>";
  }
}

/**
 * Добавляем иконки для input полей Contact Form 7
 */
function color_scheme_icons_for_inputs() {
  $preset_key = get_option('theme_color_scheme', 'default');
  $allowed_colors = ['default', 'orange', 'gray'];

  if (!in_array($preset_key, $allowed_colors)) {
    $preset_key = 'default';
  }

  $icons = [
    'your-name'    => 'icon-user',
    'your-phone'   => 'icon-phone',
    'your-address' => 'icon-map',
    'your-time'    => 'icon-time',
  ];

  echo "<style>";
  foreach ($icons as $field_name => $icon_file) {
    $icon_path = get_stylesheet_directory_uri() . "/assets/img/icons/{$icon_file}-{$preset_key}.svg";
    echo ".wpcf7 .wpcf7-form [data-name={$field_name}]:after {";
    echo "background: url('{$icon_path}') center / contain no-repeat;";
    echo "}";
  }
  echo "</style>";
}
add_action('wp_head', 'color_scheme_icons_for_inputs');
