<?php

defined('ABSPATH') || exit;

/**
 * Add favicon for frontend and Admin
 */
function add_site_favicon() {
  $favicon_url = get_static_url('favicon.ico');

  if ($favicon_url) {
    echo '<link rel="shortcut icon" href="' . esc_url($favicon_url) . '" />' . "\n";
    echo '<link rel="icon" href="' . esc_url($favicon_url) . '" type="image/x-icon" />' . "\n";
  }
}
add_action('wp_head', 'add_site_favicon');
add_action('admin_head', 'add_site_favicon');
add_action('login_head', 'add_site_favicon');


/**
 * Helper function to get static file URL
 * Checks both theme root and site root
 */
function get_static_url($filename) {
  // Проверяем в корне темы
  $theme_path = get_template_directory() . '/' . $filename;
  if (file_exists($theme_path)) {
    return get_template_directory_uri() . '/' . $filename;
  }

  // Проверяем в корне сайта
  $root_path = ABSPATH . $filename;
  if (file_exists($root_path)) {
    return home_url('/' . $filename);
  }

  return false;
}