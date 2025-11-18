<?php
defined('ABSPATH') || exit;

// Меню и подменю
function theme_settings_menu() {
  add_menu_page(
    'Настройки сайта',
    'Настройки сайта',
    'manage_options',
    'theme-settings',
    'theme_settings_page_content',
    'dashicons-admin-tools',
    80
  );

  add_submenu_page(
    'theme-settings',
    'Избранные новости',
    'Избранные новости',
    'manage_options',
    'theme-featured-posts',
    'theme_featured_posts_page_content'
  );

  add_submenu_page(
    'theme-settings',
    'Add to head',
    'Head',
    'manage_options',
    'theme-head',
    'theme_head_page_content'
  );

  add_submenu_page(
    'theme-settings',
    'Инструкции',
    'Инструкции',
    'manage_options',
    'theme-instructions',
    'theme_instructions_page_content'
  );

  // Главный пункт меню — хаб
  add_menu_page(
    'MGUBS',
    'MGUBS',
    'edit_posts',
    'mgubs',
    null,
    'dashicons-welcome-learn-more',
    4
  );

  $items = [
    'allevents'           => ['Все события',        'dashicons-calendar-alt'],
    'category_allevents'  => ['Рубрики событий',      'edit-tags.php?taxonomy=category_allevents&post_type=allevents'],
    'teachers'            => ['Преподаватели',      'dashicons-groups'],
    'success'             => ['Истории успеха',     'dashicons-format-quote'],
    'schoolhistory'       => ['История школы',     'dashicons-format-quote'],
    'manager'             => ['Менеджеры',          'dashicons-businessperson'],
    'thanks'              => ['Стр. благодар', 'dashicons-thumbs-up'],
    'admissions'          => ['Прием комисс', 'dashicons-book-alt'],
  ];

  foreach ($items as $slug => $data) {
    if (is_array($data)) {
      $title   = $data[0];
      $icon    = $data[1] ?? null;
      $link    = ($slug === 'category_allevents') ? $data[1] : 'edit.php?post_type=' . $slug;

      add_submenu_page('mgubs', $title, $title, 'edit_posts', $link);
    } else {
      add_submenu_page('mgubs', $data, $data, 'manage_options', $slug, $data);
    }
  }

  // Убираем дублирующий пункт "MINDSPACE" (он появляется автоматически как первый подменю)
  remove_submenu_page('mgubs', 'mgubs');
}
add_action('admin_menu', 'theme_settings_menu');

add_action('admin_menu', function () {
  remove_menu_page('edit.php?post_type=allevents');
  remove_menu_page('edit.php?post_type=category_allevents');
  remove_menu_page('edit.php?post_type=teachers');
  remove_menu_page('edit.php?post_type=success');
  remove_menu_page('edit.php?post_type=schoolhistory');
  remove_menu_page('edit.php?post_type=manager');
  remove_menu_page('edit.php?post_type=thanks');
  remove_menu_page('edit.php?post_type=admissions');
}, 999);
