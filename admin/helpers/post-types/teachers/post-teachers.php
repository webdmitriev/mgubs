<?php

defined('ABSPATH') || exit;

// === Регистрируем Custom Post Type "Преподаватели" ===
function register_teachers_post_type() {

  $labels = array(
    'name'               => 'Преподаватели',
    'singular_name'      => 'Преподаватели',
    'menu_name'          => 'Преподаватели',
    'name_admin_bar'     => 'Преподаватели',
    'add_new'            => 'Добавить',
    'add_new_item'       => 'Добавить',
    'new_item'           => 'Новый преподаватель',
    'edit_item'          => 'Редактировать',
    'view_item'          => 'Просмотр',
    'all_items'          => 'Все преподаватели',
    'search_items'       => 'Поиск',
    'parent_item_colon'  => 'Родительское:',
    'not_found'          => 'Преподаватели не найдены.',
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
    'rewrite'            => array('slug' => 'teachers'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-id',
    'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
  );

  register_post_type('teachers', $args);
}
add_action('init', 'register_teachers_post_type');
