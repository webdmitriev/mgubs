<?php

defined('ABSPATH') || exit;

class AdvancedAutoLinking {

  private $settings;

  public function __construct() {
    $this->settings = array(
      'max_links_per_post' => 5, // Максимум ссылок на пост
      'min_title_length' => 3,   // Минимальная длина заголовка
      'exclude_words' => array('и', 'в', 'на', 'с', 'по', 'о', 'об'), // Слова-исключения
      'post_types' => array('post', 'page') // Типы записей для обработки
    );

    add_action('save_post', array($this, 'process_auto_linking'), 10, 3);
  }

  public function process_auto_linking($post_id, $post, $update) {
    if (!$this->should_process($post_id, $post)) {
      return;
    }

    $other_posts = $this->get_eligible_posts($post_id, $post->post_type);
    if (empty($other_posts)) {
      return;
    }

    $content = $post->post_content;
    $updated_content = $content;
    $links_count = 0;

    foreach ($other_posts as $target_post) {
      if ($links_count >= $this->settings['max_links_per_post']) {
        break;
      }

      $title = $target_post->post_title;

      // Пропускаем короткие заголовки и слова-исключения
      if (strlen($title) < $this->settings['min_title_length'] || 
          in_array(mb_strtolower($title), $this->settings['exclude_words'])) {
        continue;
      }

      $updated_content = $this->replace_title_with_link($updated_content, $title, $target_post);

      if ($updated_content !== $content) {
        $links_count++;
      }
    }

    $this->update_post_content($post_id, $content, $updated_content);
  }

  private function should_process($post_id, $post) {
    // Проверяем тип записи
    if (!in_array($post->post_type, $this->settings['post_types'])) {
      return false;
    }

    if ($post->post_status !== 'publish') {
      return false;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
      return false;
    }

    if (wp_is_post_revision($post_id)) {
      return false;
    }

    return true;
  }

  private function get_eligible_posts($exclude_post_id, $post_type = 'post') {
    return get_posts(array(
      'post_type' => $this->settings['post_types'], // Ищем во всех разрешенных типах
      'post_status' => 'publish',
      'exclude' => array($exclude_post_id),
      'numberposts' => 50, // Ограничиваем для производительности
      'orderby' => 'title',
      'order' => 'DESC' // Сначала длинные заголовки
    ));
  }

  private function replace_title_with_link($content, $title, $target_post) {
    $pattern = '/\b' . preg_quote($title, '/') . '\b/iu';
    $url = get_permalink($target_post->ID);

    // Проверяем, не находится ли уже в ссылке
    if (preg_match('/<a[^>]*>' . preg_quote($title, '/') . '<\/a>/iu', $content)) {
      return $content;
    }

    $replacement = '<a href="' . esc_url($url) . '" class="auto-link" title="' . esc_attr($target_post->post_title) . '">' . $title . '</a>';

    return preg_replace($pattern, $replacement, $content, 1); // Заменяем только первое вхождение
  }

  private function update_post_content($post_id, $original_content, $updated_content) {
    if ($updated_content !== $original_content) {
      remove_action('save_post', array($this, 'process_auto_linking'), 10);

      wp_update_post(array(
        'ID' => $post_id,
        'post_content' => $updated_content
      ));

      add_action('save_post', array($this, 'process_auto_linking'), 10, 3);
    }
  }
}

new AdvancedAutoLinking();