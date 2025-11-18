<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "page"
 */
function register_page_meta_fields() {
  $post_type = 'page';

  // Булевы поля
  $boolean_fields = [
    'is_jivo_chat',
  ];
  foreach ($boolean_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'boolean',
      'single' => true,
      'sanitize_callback' => 'rest_sanitize_boolean',
      'show_in_rest' => true,
    ]);
  }
}
add_action('init', 'register_page_meta_fields');
