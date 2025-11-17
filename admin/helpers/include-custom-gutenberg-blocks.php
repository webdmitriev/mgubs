<?php

defined('ABSPATH') || exit;

function theme_blocks_assets() {
  // Регистрируем скрипты
  wp_register_script(
    'theme-blocks',
    get_template_directory_uri() . '/build/index.js',
    array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-edit-post', 'wp-plugins', 'wp-data', 'wp-compose'),
    filemtime(get_template_directory() . '/build/index.js'),
    true
  );

  // ✅ Локализация (если нужно)
  wp_localize_script('theme-blocks', 'themeData', array(
    'siteUrl'   => get_site_url(),
    'uploadUrl' => get_template_directory_uri() . '/admin/instructions',
  ));

  // Регистрируем стили редактора
  wp_register_style(
    'theme-blocks-editor',
    get_template_directory_uri() . '/admin/assets/css-js/admin-index.css',
    array('wp-edit-blocks'),
    '1.0.0'
  );

  // ✅ Подключаем JS панели SEO в редактор
  add_action('enqueue_block_editor_assets', function() {
      wp_enqueue_script('theme-blocks');
  });

  // Регистрируем пример блока
  register_block_type('theme/simple-block', array(
    'editor_script' => 'theme-blocks',
    'editor_style'  => 'theme-blocks-editor'
  ));
}
add_action('init', 'theme_blocks_assets');
