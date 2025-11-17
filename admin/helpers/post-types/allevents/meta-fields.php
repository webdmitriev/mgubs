<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "allevents"
 */
function register_allevents_meta_fields() {
  $post_type = 'allevents';

  // Булевы поля
  $boolean_fields = [
    'is_jivo_chat',
    'is_done_event'
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
    'custom_excerpt',
    'bgc',
    'shadow_image',
    'date_start',
    'date_time',
    'date_end',
  ];
  foreach ($string_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'string',
      'single' => true,
      'sanitize_callback' => 'sanitize_text_field',
      'show_in_rest' => true,
    ]);
  }

  // Массив для MultipleCheckboxControl
  register_post_meta($post_type, 'selected_programs', [
    'type' => 'array',
    'single' => true,
    'show_in_rest' => [
      'schema' => [
        'type' => 'array',
        'items' => ['type' => 'string'],
      ],
    ],
    'sanitize_callback' => function($value) {
      if (!is_array($value)) return [];
      return array_map('sanitize_text_field', $value);
    }
  ]);
}
add_action('init', 'register_allevents_meta_fields');
