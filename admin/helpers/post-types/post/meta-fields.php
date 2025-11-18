<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "post"
 */
function register_post_meta_fields() {
  $post_type = 'post';

  // Булевы поля
  $boolean_fields = [
    'is_logotype',
    'is_logotype_special',
  ];
  foreach ($boolean_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'boolean',
      'single' => true,
      'sanitize_callback' => 'rest_sanitize_boolean',
      'show_in_rest' => true,
    ]);
  }

  // Строковые поля
  $string_fields = [
    'date_start',
    'custom_excerpt',
  ];
  foreach ($string_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'string',
      'single' => true,
      'sanitize_callback' => 'sanitize_text_field',
      'show_in_rest' => true,
    ]);
  }
}
add_action('init', 'register_post_meta_fields');
