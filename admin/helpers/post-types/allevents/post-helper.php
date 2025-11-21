<?php

defined('ABSPATH') || exit;

/**
 * Получить посты по выбранным программам
 */
function get_posts_by_selected_programs($program_slug, $post_type = 'allevents', $args = []) {
  $default_args = [
    'post_type' => $post_type,
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'DESC',
    'meta_query' => [
      [
        'key' => 'selected_programs',
        'value' => '"' . $program_slug . '"',
        'compare' => 'LIKE'
      ]
    ]
  ];

  $final_args = wp_parse_args($args, $default_args);
  return new WP_Query($final_args);
}

/**
 * Получить посты для футера по программе (только будущие события)
 */
function get_footer_posts_by_program($program_slug, $limit = 5) {
  $today = date('Y-m-d');

  return get_posts_by_selected_programs($program_slug, 'allevents', [
    'posts_per_page' => $limit,
    'orderby' => 'meta_value',
    'meta_key' => 'date_start',
    'order' => 'ASC', // ближайшие события first
    'meta_query' => [
      'relation' => 'AND',
      [
        'key' => 'selected_programs',
        'value' => '"' . $program_slug . '"',
        'compare' => 'LIKE'
      ],
      [
        'key' => 'date_start',
        'value' => $today,
        'compare' => '>=', // только будущие события
        'type' => 'DATE'
      ]
    ]
  ]);
}