<?php

defined('ABSPATH') || exit;


/*
 * wpcf7
 */
add_filter('wpcf7_autop_or_not', '__return_false');


function custom_cf7_tag() {
  wpcf7_add_form_tag('current_url', 'custom_cf7_text_handler');
}
add_action('wpcf7_init', 'custom_cf7_tag');

function custom_cf7_text_handler($tag) {
  return get_home_url(null, '/');
}

// WP_REST
add_action('init', function() {
    $post_type = 'wpcf7_contact_form';
    global $wp_post_types;

    if (isset($wp_post_types[$post_type])) {
        $wp_post_types[$post_type]->show_in_rest = true;
        $wp_post_types[$post_type]->rest_base = $post_type;
        $wp_post_types[$post_type]->rest_controller_class = 'WP_REST_Posts_Controller';
    }
});
