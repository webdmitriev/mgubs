<?php

defined('ABSPATH') || exit;

// === Регистрируем Custom Post Type "События" ===
function register_allevents_post_type() {

  $labels = array(
    'name'               => 'События',
    'singular_name'      => 'Событие',
    'menu_name'          => 'События',
    'name_admin_bar'     => 'Событие',
    'add_new'            => 'Добавить событие',
    'add_new_item'       => 'Добавить новое событие',
    'new_item'           => 'Новое событие',
    'edit_item'          => 'Редактировать событие',
    'view_item'          => 'Просмотр события',
    'all_items'          => 'Все события',
    'search_items'       => 'Поиск событий',
    'parent_item_colon'  => 'Родительское событие:',
    'not_found'          => 'События не найдены.',
    'not_found_in_trash' => 'В корзине событий нет.',
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'show_in_rest'       => true, // Включаем поддержку Gutenberg / API
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array('slug' => 'allevents'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-id',
    'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
  );

  register_post_type('allevents', $args);
}
add_action('init', 'register_allevents_post_type');
