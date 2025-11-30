<?php

defined('ABSPATH') || exit;

// Шорткод [teachers_block ids="1,2,3"]
add_shortcode('teachers_block', function($atts) {

    $atts = shortcode_atts([
        'ids' => ''
    ], $atts);

    if (empty($atts['ids'])) {
        return '<p>Преподаватели не выбраны.</p>';
    }

    $ids = array_map('intval', explode(',', $atts['ids']));

    $query = new WP_Query([
        'post_type'      => 'teachers',
        'post__in'       => $ids,
        'orderby'        => 'post__in',
        'posts_per_page' => -1
    ]);

    ob_start();

    echo '<div class="block-standard block-08">';
    echo '<div class="container">';

    while ($query->have_posts()) {
        $query->the_post();

        $post_id = get_the_ID();

        $title = get_the_title();
        $position = get_post_meta($post_id, 'position', true);

        ?>
        <div class="teacher-article">
            <?php
              if( has_post_thumbnail() ):
                echo theme_get_responsive_thumbnail($post_id, 'full', [
                    'class' => 'teacher-image'
                ]);
              else: ?>
              <img src="data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==" alt="MGU" class="teacher-image" />
            <?php endif; ?>

            <div class="teacher-title"><?php echo esc_html($title); ?></div>

            <?php if ($position): ?>
                <div class="teacher-descr"><?php echo wp_kses_post($position); ?></div>
            <?php endif; ?>

            <div class="teacher-link">Подробнее</div>
        </div>
        <?php
    }

    echo '</div>';

    echo '<a href="#" class="btn btn-white">Все новости</a>';
    echo '</div>';

    wp_reset_postdata();

    return ob_get_clean();
});
