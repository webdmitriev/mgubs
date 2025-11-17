<?php

defined('ABSPATH') || exit;

// Стили админки
function theme_settings_enqueue_admin_styles($hook) {
  if ($hook !== 'toplevel_page_theme-settings') return;

  wp_enqueue_style(
    'theme-settings-css',
    get_template_directory_uri() . '/admin/assets/css-js/theme-settings.css',
    [],
    '1.0.0'
  );
}
add_action('admin_enqueue_scripts', 'theme_settings_enqueue_admin_styles');
