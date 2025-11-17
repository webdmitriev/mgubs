<?php

defined('ABSPATH') || exit;

// Получение данных из опций
function get_theme_phone() {
  $settings = get_option('theme_settings', []);
  return $settings['contact_info']['phone'] ?? '';
}

function get_theme_email() {
  $settings = get_option('theme_settings', []);
  return $settings['contact_info']['email'] ?? '';
}

function get_theme_partners() {
  $settings = get_option('theme_settings', []);
  return $settings['partners'] ?? [];
}
