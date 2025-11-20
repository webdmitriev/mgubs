<?php

defined('ABSPATH') || exit;

// Получение данных социальных сетей из опций
function get_theme_social() {
  $settings = get_option('theme_settings', []);
  return $settings['social'] ?? [];
}

function get_footer_description() {
  $options = get_option('theme_settings');
  return $options['footer_description'] ?? '';
}

function get_featured_posts() {
  $options = get_option('theme_settings');
  return $options['featured_posts'] ?? [];
}

//$logo = get_theme_logo();
function get_theme_logo() {
  $options = get_option('theme_settings');
  $logo_id = $options['site_logo'] ?? '';

  if (!$logo_id) {
    return '';
  }

  return wp_get_attachment_url($logo_id);
}
