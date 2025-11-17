<?php

defined('ABSPATH') || exit;

// === Регистрируем Custom Post Type "История школы" ===
function register_schoolhistory_post_type() {

  $labels = array(
    'name'               => 'История школы',
    'singular_name'      => 'История школы',
    'menu_name'          => 'История школы',
    'name_admin_bar'     => 'История школы',
    'add_new'            => 'Добавить',
    'add_new_item'       => 'Добавить',
    'new_item'           => 'Новая история',
    'edit_item'          => 'Редактировать',
    'view_item'          => 'Просмотр',
    'all_items'          => 'Все истории',
    'search_items'       => 'Поиск',
    'parent_item_colon'  => 'Родительское:',
    'not_found'          => 'Историй не найдены.',
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
    'rewrite'            => array('slug' => 'schoolhistory'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-id',
    'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
  );

  register_post_type('schoolhistory', $args);
}
add_action('init', 'register_schoolhistory_post_type');
