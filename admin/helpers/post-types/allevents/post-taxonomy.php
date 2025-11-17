<?php

defined('ABSPATH') || exit;

// === Регистрируем таксономии ===
function register_category_allevents_taxonomy() {
  $labels = array(
    'name'              => 'Рубрики событий',
    'singular_name'     => 'Рубрика',
    'search_items'      => 'Найти рубрику',
    'all_items'         => 'Все рубрики',
    'edit_item'         => 'Редактировать рубрику',
    'update_item'       => 'Обновить рубрику',
    'add_new_item'      => 'Добавить новую рубрику',
    'new_item_name'     => 'Название новой рубрику',
    'menu_name'         => 'Рубрики событий',
  );

  register_taxonomy('category_allevents', array('allevents'), array(
    'hierarchical'      => true,
    'labels'            => $labels,
    'show_ui'           => true,
    'show_admin_column' => true,
    'query_var'         => true,
    'rewrite'           => array('slug' => 'category-allevents'),
    'show_in_rest'      => true,
  ));
}
add_action('init', 'register_category_allevents_taxonomy');