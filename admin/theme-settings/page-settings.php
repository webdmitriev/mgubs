<?php

defined('ABSPATH') || exit;

// Страница Theme Settings
function theme_settings_page_content() {
  $theme_settings = get_option('theme_settings', []);
  $contact_info = $theme_settings['contact_info'] ?? ['phone' => '', 'email' => ''];
  $partners = $theme_settings['partners'] ?? [];
  include get_template_directory() . '/admin/theme-settings/templates/page-settings-template.php';
}
