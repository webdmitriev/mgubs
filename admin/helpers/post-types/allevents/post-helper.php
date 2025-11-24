<?php

defined('ABSPATH') || exit;

/**
 * Получить посты по выбранным программам
 */
function get_posts_by_selected_programs($program_slug, $post_type = 'allevents', $args = []) {
  $default_args = [
    'post_type' => $post_type,
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'DESC',
    'meta_query' => [
      [
        'key' => 'selected_programs',
        'value' => '"' . $program_slug . '"',
        'compare' => 'LIKE'
      ]
    ]
  ];

  $final_args = wp_parse_args($args, $default_args);
  return new WP_Query($final_args);
}

/**
 * Получить посты для футера по программе (только будущие события)
 */
function get_footer_posts_by_program($program_slug, $limit = 5) {
  $today = date('Y-m-d');

  return get_posts_by_selected_programs($program_slug, 'allevents', [
    'posts_per_page' => $limit,
    'orderby' => 'meta_value',
    'meta_key' => 'date_start',
    'order' => 'ASC', // ближайшие события first
    'meta_query' => [
      'relation' => 'AND',
      [
        'key' => 'selected_programs',
        'value' => '"' . $program_slug . '"',
        'compare' => 'LIKE'
      ],
      [
        'key' => 'date_start',
        'value' => $today,
        'compare' => '>=', // только будущие события
        'type' => 'DATE'
      ]
    ]
  ]);
}

// 
// Функция рендеринга блока
function render_popular_events_block($attributes, $content) {
    $program_slug = $attributes['selectedProgram'] ?? '';
    $title = $attributes['title'] ?? '';
    $limit = 5; // фиксированный лимит или можно сделать атрибутом
    
    // Если программа не выбрана, возвращаем сохраненный контент
    if (empty($program_slug)) {
        return $content;
    }
    
    // Для программы 'all'
    if ($program_slug === 'all') {
        $events_query = get_all_future_events($limit);
    } else {
        $events_query = get_footer_posts_by_program($program_slug, $limit);
    }
    ob_start();
    ?>
    <div class="block-standard block-02">
      <div class="container">
        <?php if (!empty($title)): ?><div class="block-title"><h2 class="h2 underline"><?php echo esc_html($title); ?></h2></div><?php endif; ?>

        <?php if ($events_query->have_posts()): while ($events_query->have_posts()): $events_query->the_post();
            $date_info = format_date_russian(get_post_meta(get_the_ID(), 'date_start', true));
            $date_time = get_post_meta(get_the_ID(), 'date_time', true);
            $excerpt = get_post_meta(get_the_ID(), 'custom_excerpt', true);
          ?>
            <a href="<?php the_permalink(); ?>" class="event-item df-sp-st">
              <div class="event-item__date df-ce-ce">
                <?php if ($date_info) : ?>
                  <div class="event-item__date-day"><?php echo esc_html($date_info['day']); ?></div>
                  <div class="event-item__date-month"><?php echo esc_html($date_info['month_russian']); ?></div>
                  <div class="event-item__date-time"><?php echo !empty($date_time) ? esc_html($date_time) : '......'; ?></div>
                <?php else : ?>
                  <div class="event-item__date-month">Даты нет</div>
                <?php endif; ?>
              </div>
              <div class="event-item__image">
                <p class="event-item__title"><?php the_title(); ?></p>
                <?php echo theme_get_responsive_thumbnail(); ?>
              </div>
              <div class="event-item__content">
                <p class="event-item__title"><?php the_title(); ?></p>
                <p class="descr"><?php echo esc_html($excerpt); ?></p>
                <div class="link">Подробнее</div>
              </div>
            </a>
          <?php endwhile; else: ?>
          <p class="descr">На ближайшее время событий не запланировано</p>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
      </div>
      <div class="btn btn-white">Кнопка</div>
    </div>
    <?php
    return ob_get_clean();
}

// Дополнительная функция для программы 'all'
function get_all_future_events($limit = 5) {
  $today = date('Y-m-d');

  $args = [
    'post_type' => 'allevents',
    'post_status' => 'publish',
    'posts_per_page' => $limit,
    'orderby' => 'meta_value',
    'meta_key' => 'date_start',
    'order' => 'ASC',
    'meta_query' => [
      [
        'key' => 'date_start',
        'value' => $today,
        'compare' => '>=',
        'type' => 'DATE'
      ]
    ]
  ];

  return new WP_Query($args);
}

// Регистрация блока
function register_popular_events_block() {
  register_block_type('theme/block-02', [
    'render_callback' => 'render_popular_events_block'
  ]);
}
add_action('init', 'register_popular_events_block');