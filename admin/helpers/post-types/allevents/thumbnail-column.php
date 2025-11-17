<?php

defined('ABSPATH') || exit;

// Добавляем колонку с изображением
function add_allevents_admin_columns($columns) {
  $new_columns = array();

  foreach($columns as $key => $title) {
    if ($key == 'title') {
      $new_columns['title'] = $title;
      $new_columns['thumbnail'] = 'Изображение';
    } else {
      $new_columns[$key] = $title;
    }
  }
  return $new_columns;
}
add_filter('manage_allevents_posts_columns', 'add_allevents_admin_columns');

// Заполняем кастомные колонки
function display_allevents_admin_columns($column_name, $post_id) {
  $thumbnail = get_the_post_thumbnail($post_id, array(80, 80));
  if ($thumbnail) {
    echo '<div style="width:110px;height:110px;">';
    echo '<style>[data-colname="Изображение"] img { width:100%;height:100%;object-fit:cover; }</style>';
    echo $thumbnail;
    echo '</div>';
  } else {
    echo '<div style="width:110px;height:110px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;color:#ccc;">';
    echo '<span class="dashicons dashicons-format-image"></span>';
    echo '</div>';
  }
}
add_action('manage_allevents_posts_custom_column', 'display_allevents_admin_columns', 10, 2);