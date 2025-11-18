<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "manager"
 */
function register_manager_meta_fields() {
  $post_type = 'manager';

  // Строковые поля
  $string_fields = [
    'role',
  ];
  foreach ($string_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'string',
      'single' => true,
      'sanitize_callback' => 'sanitize_text_field',
      'show_in_rest' => true,
    ]);
  }

  // repeater - phone
  register_post_meta($post_type, 'phone', [
    'type' => 'array',
    'single' => true,
    'sanitize_callback' => 'sanitize_phone_field',
    'show_in_rest' => [
      'schema' => [
        'type' => 'array',
        'items' => [
          'type' => 'string'
        ]
      ]
    ],
  ]);

  // repeater - email
  register_post_meta($post_type, 'email', [
    'type' => 'array',
    'single' => true,
    'sanitize_callback' => 'sanitize_email_field',
    'show_in_rest' => [
      'schema' => [
        'type' => 'array',
        'items' => [
          'type' => 'string'
        ]
      ]
    ],
  ]);
}
add_action('init', 'register_manager_meta_fields');


/**
 * Санитизация поля phone
 */
function sanitize_phone_field($value) {
  if (!is_array($value)) {
    return [];
  }
  return array_map('sanitize_text_field', $value);
}


/**
 * Санитизация поля email
 */
function sanitize_email_field($value) {
  if (!is_array($value)) {
    return [];
  }
  return array_map('sanitize_text_field', $value);
}