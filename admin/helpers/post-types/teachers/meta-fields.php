<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "teachers"
 */
function register_teachers_meta_fields() {
  $post_type = 'teachers';

  // Булевы поля
  $boolean_fields = [
    'is_button_off',
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
    'position',
    'custom_excerpt',
  ];
  foreach ($string_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'string',
      'single' => true,
      'sanitize_callback' => function($value) {
        // Разрешаем только <br />
        return wp_kses($value, [
          'br' => []
        ]);
      },
      'show_in_rest' => true,
    ]);
  }
}
add_action('init', 'register_teachers_meta_fields');
