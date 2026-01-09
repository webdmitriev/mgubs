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

//$is_logotype = get_is_logotype();
function get_is_logotype() {
  $options = get_option('theme_settings');
  $logo_id = $options['is_logotype'] ?? '';
  if (!$logo_id) { return ''; }

  return wp_get_attachment_url($logo_id);
}

//$is_logotype_special = get_is_logotype_special();
function get_is_logotype_special() {
  $options = get_option('theme_settings');
  $logo_id = $options['is_logotype_special'] ?? '';
  if (!$logo_id) { return ''; }

  return wp_get_attachment_url($logo_id);
}
