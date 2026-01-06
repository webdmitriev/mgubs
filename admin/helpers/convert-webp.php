<?php
defined('ABSPATH') || exit;

add_filter('wp_handle_upload_prefilter', function ($file) {
  $timestamp = current_time('timestamp');
  $rand = wp_rand(100, 999);

  $filename = sanitize_file_name($file['name']);

  // защита от повторного добавления
  if (!preg_match('/^\d{10}-\d{3}-/', $filename)) {
    $file['name'] = "{$timestamp}-{$rand}-{$filename}";
  }
  return $file;
});


/**
 * 1. Отключаем стандартные размеры WordPress
 */
add_filter('intermediate_image_sizes_advanced', function () {
  return [];
});

add_filter('big_image_size_threshold', '__return_false');

/**
 * 2. Добавляем только свои размеры
 */
add_action('after_setup_theme', function () {
  add_image_size('img-480', 480, 0, false);
  add_image_size('img-768', 768, 0, false);
  add_image_size('img-1280', 1280, 0, false);
  add_image_size('img-1920', 1920, 0, false);
});

/**
 * 3. Убираем стандартные размеры из выбора в админке
 */
add_filter('image_size_names_choose', function () {
  return [];
});

/**
 * 4. Генерируем JPG + WebP для нужных разрешений
 */
add_filter('wp_generate_attachment_metadata', function ($meta, $attachment_id) {
  $file = get_attached_file($attachment_id);
  if (!file_exists($file)) return $meta;

  $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
  if (!in_array($ext, ['jpg', 'jpeg', 'png'])) return $meta; // только изображения

  $sizes = [480, 768, 1280, 1920];

  foreach ($sizes as $size) {
    // Resize и сохраняем исходный формат (JPG или PNG)
    $editor = wp_get_image_editor($file);
    if (!is_wp_error($editor)) {
      $editor->resize($size, null, false);
      $editor->save(str_replace(".{$ext}", "-{$size}.{$ext}", $file));
    }

    // WebP — только для JPG/JPEG
    if (in_array($ext, ['jpg', 'jpeg'])) {
      $webp = wp_get_image_editor($file);
      if (!is_wp_error($webp)) {
        $webp->resize($size, null, false);
        $webp->save(str_replace(".{$ext}", "-{$size}.webp", $file), 'image/webp');
      }
    }
  }

  return $meta;
}, 20, 2);


/**
 * 5. responsive-данные для Gutenberg
 */
add_filter('wp_prepare_attachment_for_js', function ($response, $attachment) {

  if (!isset($response['url'])) return $response;

  $file = get_attached_file($attachment->ID);
  $upload = wp_get_upload_dir();
  $dir = pathinfo($file, PATHINFO_DIRNAME);
  $name = pathinfo($file, PATHINFO_FILENAME);
  $ext = pathinfo($file, PATHINFO_EXTENSION);

  $sizes = [480, 768, 1280, 1920];
  $webp = [];
  $jpg = [];

  foreach ($sizes as $s) {
    $jpg_file = "{$dir}/{$name}-{$s}.{$ext}";
    $webp_file = "{$dir}/{$name}-{$s}.webp";

    if (file_exists($jpg_file)) {
      $jpg[] = str_replace($upload['basedir'], $upload['baseurl'], $jpg_file) . " {$s}w";
    }
    if (file_exists($webp_file)) {
      $webp[] = str_replace($upload['basedir'], $upload['baseurl'], $webp_file) . " {$s}w";
    }
  }

  $response['responsive'] = [
    'webp'    => implode(', ', $webp),
    'jpg'     => implode(', ', $jpg),
    'default' => $response['url'],
  ];

  return $response;
}, 20, 2);

/**
 * 6. REST API → добавляем .webp URL
 */
add_filter('rest_prepare_attachment', function ($response, $post) {

  $file = get_attached_file($post->ID);
  $upload = wp_get_upload_dir();

  $webp = pathinfo($file, PATHINFO_DIRNAME) . '/' . pathinfo($file, PATHINFO_FILENAME) . '.webp';

  $response->data['webp_url'] = file_exists($webp)
    ? str_replace($upload['basedir'], $upload['baseurl'], $webp)
    : '';

  return $response;
}, 10, 2);

/**
 * 7. Функция для блоков → получаем все данные
 */
function theme_get_block_image_data($id) {
  if (!$id) return null;

  $response = wp_prepare_attachment_for_js(get_post($id));

  return [
    'url'        => wp_get_attachment_url($id),
    'alt'        => get_post_meta($id, '_wp_attachment_image_alt', true),
    'responsive' => $response['responsive'] ?? [
      'webp'    => '',
      'jpg'     => '',
      'default' => wp_get_attachment_url($id),
    ]
  ];
}


// 1. Сохраняем оригинальное базовое имя при загрузке (до подмены на -1920)
add_filter('wp_generate_attachment_metadata', function ($metadata, $attachment_id) {
  $file = get_attached_file($attachment_id);
  if ($file) {
    $basename = pathinfo($file, PATHINFO_FILENAME);
    // Убираем возможный -scaled, если он уже есть
    $basename = preg_replace('/-scaled$/', '', $basename);
    update_post_meta($attachment_id, '_original_basename', $basename);
  }
  return $metadata;
}, 5, 2);

// 2. Удаляем ВСЁ при удалении изображения
add_action('delete_attachment', 'delete_all_my_custom_image_versions', 1);
function delete_all_my_custom_image_versions($attachment_id) {
  // Получаем оригинальное базовое имя (до всех преобразований)
  $basename = get_post_meta($attachment_id, '_original_basename', true);

  // Если по какой-то причине нет — попробуем вытащить из текущего файла
  if (!$basename) {
    $file = get_attached_file($attachment_id);
    if ($file) {
      $basename = pathinfo($file, PATHINFO_FILENAME);
      // Убираем -1920, -1280 и т.д. в конце
      $basename = preg_replace('/-(\d+|scaled)$/', '', $basename);
    }
  }

  if (!$basename) return;

  $upload_dir = wp_upload_dir();
  $dir = dirname(get_attached_file($attachment_id));

  // Удаляем ВСЁ, что начинается с оригинального имени + дефис
  // Это ловит: photo-480.jpg, photo-1920.webp, photo-1280.jpeg и т.д.
  $pattern = $dir . '/' . $basename . '-*';
  foreach (glob($pattern) as $file) {
    if (is_file($file)) {
      wp_delete_file($file);
    }
  }

  // Дополнительно: удаляем основной файл (может быть photo-1920.jpg)
  $main_file = get_attached_file($attachment_id);
  if ($main_file && file_exists($main_file)) {
    wp_delete_file($main_file);
  }

  // И на всякий случай — удаляем оригинал, если он где-то остался (редко)
  $original_path = wp_get_original_image_path($attachment_id);
  if ($original_path && file_exists($original_path) && $original_path !== $main_file) {
    wp_delete_file($original_path);
  }

  // Чистим мету
  delete_post_meta($attachment_id, '_original_basename');
}