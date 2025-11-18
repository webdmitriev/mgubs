<?php
defined('ABSPATH') || exit;

/**
 * Регистрация метаполей для post type "admissions"
 */
function register_admissions_meta_fields() {
  $post_type = 'admissions';

  register_post_meta($post_type, 'custom_excerpt', [
    'type' => 'string',
    'single' => true,
    'sanitize_callback' => 'sanitize_text_field',
    'show_in_rest' => true,
  ]);

  register_post_meta($post_type, 'admission_file', [
    'type'         => 'integer',
    'single'       => true,
    'show_in_rest' => true,
    'auth_callback' => function() {
        return current_user_can('edit_posts');
    }
  ]);
}
add_action('init', 'register_admissions_meta_fields');
