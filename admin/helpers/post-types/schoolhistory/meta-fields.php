<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "schoolhistory"
 */
function register_schoolhistory_meta_fields() {
  $post_type = 'schoolhistory';

  // Булевы поля
  $boolean_fields = [
    'is_link_off',
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
    'year',
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
add_action('init', 'register_schoolhistory_meta_fields');
