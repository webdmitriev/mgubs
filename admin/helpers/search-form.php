<?php

defined('ABSPATH') || exit;

add_action('wp_ajax_news_search', 'news_search_callback');
add_action('wp_ajax_nopriv_news_search', 'news_search_callback');

function news_search_callback() {

    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'news_search_nonce')) {
        wp_send_json_error('Security check failed');
    }

    $search_term = sanitize_text_field($_POST['s'] ?? '');

    if (strlen($search_term) < 2) {
        wp_send_json_error('Слишком короткий запрос');
    }

    $args = array(
        'post_type'      => 'post',
        'posts_per_page' => 8,
        's'              => $search_term,
        'post_status'    => 'publish'
    );

    $q = new WP_Query($args);
    $results = [];

    if ($q->have_posts()) {
        while ($q->have_posts()) {
            $q->the_post();

            $results[] = array(
                'id'        => get_the_ID(),
                'title'     => get_the_title(),
                'link'      => get_permalink(),
                'thumbnail' => get_the_post_thumbnail_url(),
            );
        }
        wp_reset_postdata();

        wp_send_json_success($results);
    }

    wp_send_json_error('Ничего не найдено');
}

// Передаём nonce через wp_localize_script
add_action('wp_enqueue_scripts', function () {
    wp_localize_script('search-form', 'NewsSearchData', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('news_search_nonce')
    ]);
});

