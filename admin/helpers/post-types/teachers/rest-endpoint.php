<?php

defined('ABSPATH') || exit;

add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/teachers-search', [
    'methods'  => 'GET',
    'callback' => function ($request) {
      $term = sanitize_text_field($request['search']);

      $query = new WP_Query([
        'post_type'      => 'teachers',
        's'              => $term,
        'posts_per_page' => 20,
      ]);

      $results = [];

      while ($query->have_posts()) { $query->the_post();
        $results[] = [
          'id'              => get_the_ID(),
          'title'           => get_the_title(),
          'url'             => get_permalink(),
          'is_button_off'   => get_post_meta(get_the_ID(), 'is_button_off', true),
          'position'        => get_post_meta(get_the_ID(), 'position', true),
          'custom_excerpt'  => get_post_meta(get_the_ID(), 'custom_excerpt', true),
        ];
      }

      wp_reset_postdata();

      return $results;
    },
    'permission_callback' => '__return_true'
  ]);
});
