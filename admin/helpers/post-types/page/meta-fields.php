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

  // Строковые поля
  $string_fields = [
    'custom_title',
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

  $str_fields = [
    'shadow_image',
  ];
  foreach ($str_fields as $field) {
    register_post_meta($post_type, $field, [
      'type' => 'string',
      'single' => true,
      'sanitize_callback' => 'sanitize_text_field',
      'show_in_rest' => true,
    ]);
  }
}
add_action('init', 'register_page_meta_fields');
