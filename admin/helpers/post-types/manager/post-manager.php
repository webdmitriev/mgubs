<?php

defined('ABSPATH') || exit;

// === Регистрируем Custom Post Type "Менеджер" ===
function register_manager_post_type() {

  $labels = array(
    'name'               => 'Менеджер',
    'singular_name'      => 'Менеджер',
    'menu_name'          => 'Менеджер',
    'name_admin_bar'     => 'Менеджер',
    'add_new'            => 'Добавить',
    'add_new_item'       => 'Добавить',
    'new_item'           => 'Новый менеджер',
    'edit_item'          => 'Редактировать',
    'view_item'          => 'Просмотр',
    'all_items'          => 'Все менеджеры',
    'search_items'       => 'Поиск',
    'parent_item_colon'  => 'Родительское:',
    'not_found'          => 'Менеджера не найдены.',
    'not_found_in_trash' => 'В корзине нет.',
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'show_in_rest'       => true, // Включаем поддержку Gutenberg / API
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array('slug' => 'manager'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-id',
    'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
  );

  register_post_type('manager', $args);
}
add_action('init', 'register_manager_post_type');
