<?php

defined('ABSPATH') || exit;

// === Регистрируем Custom Post Type "Стр. благодар" ===
function register_thanks_post_type() {

  $labels = array(
    'name'               => 'Стр. благодар',
    'singular_name'      => 'Стр. благодар',
    'menu_name'          => 'Стр. благодар',
    'name_admin_bar'     => 'Стр. благодар',
    'add_new'            => 'Добавить',
    'add_new_item'       => 'Добавить',
    'new_item'           => 'Новая страница',
    'edit_item'          => 'Редактировать',
    'view_item'          => 'Просмотр',
    'all_items'          => 'Все страницы',
    'search_items'       => 'Поиск',
    'parent_item_colon'  => 'Родительское:',
    'not_found'          => 'Страницы не найдены.',
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
    'rewrite'            => array('slug' => 'thanks'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-id',
    'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
  );

  register_post_type('thanks', $args);
}
add_action('init', 'register_thanks_post_type');
