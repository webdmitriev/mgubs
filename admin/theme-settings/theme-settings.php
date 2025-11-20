<?php
if (!defined('ABSPATH')) exit;

require_once get_template_directory() . '/admin/theme-settings/menu.php';
require_once get_template_directory() . '/admin/theme-settings/sanitize.php';

require_once get_template_directory() . '/admin/theme-settings/page-settings.php';
require_once get_template_directory() . '/admin/theme-settings/page-instructions.php';
require_once get_template_directory() . '/admin/theme-settings/page-add-to-head.php';
require_once get_template_directory() . '/admin/theme-settings/page-featured-posts.php';

require_once get_template_directory() . '/admin/theme-settings/enqueue.php';
require_once get_template_directory() . '/admin/theme-settings/helpers.php';
require_once get_template_directory() . '/admin/theme-settings/shortcodes.php';


function theme_settings_admin_scripts($hook) {
  // Загружаем только на своей странице настроек
  if ($hook !== 'toplevel_page_theme-settings') return;

  wp_enqueue_media(); // важно! подключает wp.media
  wp_enqueue_script(
    'theme-admin-js',
    get_template_directory_uri() . '/admin/assets/css-js/admin.js',
    ['jquery'],
    '0.0.01',
    true
  );
}
add_action('admin_enqueue_scripts', 'theme_settings_admin_scripts');
