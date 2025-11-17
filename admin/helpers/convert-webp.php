<?php

defined('ABSPATH') || exit;

/**
 * Конвертируем загружаемые изображения в WebP и адаптивные JPG
 */
add_filter('wp_generate_attachment_metadata', function ($metadata, $attachment_id) {
    $file = get_attached_file($attachment_id);
    $filetype = wp_check_filetype($file);
    $mime = $filetype['type'];

    // Только изображения
    if (strpos($mime, 'image/') !== 0) {
        return $metadata;
    }

    $sizes = [480, 768, 1280, 1920]; // адаптивные размеры
    $upload_dir = wp_get_upload_dir();
    $info = pathinfo($file);
    $dir = $info['dirname'];
    $name = $info['filename'];
    $ext = $info['extension'];

    foreach ($sizes as $size) {
        $dest_jpg = "{$dir}/{$name}-{$size}.{$ext}";
        $dest_webp = "{$dir}/{$name}-{$size}.webp";

        // Проверяем оригинал
        if (!file_exists($file)) continue;

        // Создаём JPG ресайз
        $image_jpg = wp_get_image_editor($file);
        if (!is_wp_error($image_jpg)) {
            $image_jpg->resize($size, null);
            $image_jpg->save($dest_jpg);
        }

        // Создаём WebP ресайз
        $image_webp = wp_get_image_editor($file);
        if (!is_wp_error($image_webp)) {
            $image_webp->resize($size, null);
            $image_webp->save($dest_webp, 'image/webp');
        }
    }

    return $metadata;
}, 20, 2);

/**
 * Скрываем WebP из медиатеки
 */
add_filter('wp_prepare_attachment_for_js', function ($response, $attachment, $meta) {
    if (!empty($response['url']) && substr($response['url'], -5) === '.webp') {
        return false;
    }

    $file_path = get_attached_file($attachment->ID);
    $upload_dir = wp_get_upload_dir();
    $base_url = $upload_dir['baseurl'];

    $info = pathinfo($file_path);
    $dir = $info['dirname'];
    $name = $info['filename'];
    $ext = $info['extension'];

    $sizes = [480, 768, 1280, 1920];
    $webp_sources = [];
    $jpg_sources = [];

    foreach ($sizes as $size) {
        $webp_file = "{$dir}/{$name}-{$size}.webp";
        $jpg_file = "{$dir}/{$name}-{$size}.{$ext}";

        if (file_exists($webp_file)) {
            $webp_sources[] = str_replace($upload_dir['basedir'], $base_url, $webp_file) . " {$size}w";
        }
        if (file_exists($jpg_file)) {
            $jpg_sources[] = str_replace($upload_dir['basedir'], $base_url, $jpg_file) . " {$size}w";
        }
    }

    $default_file = "{$dir}/{$name}-1920.{$ext}";
    $default_url = file_exists($default_file)
        ? str_replace($upload_dir['basedir'], $base_url, $default_file)
        : wp_get_attachment_url($attachment->ID);

    $response['responsive'] = [
        'webp' => implode(', ', $webp_sources),
        'jpg' => implode(', ', $jpg_sources),
        'default' => $default_url,
    ];

    return $response;
}, 20, 3);

/**
 * REST API — добавляем webp_url
 */
add_filter('rest_prepare_attachment', function ($response, $post, $request) {
    $file_path = get_attached_file($post->ID);
    $webp_file = pathinfo($file_path, PATHINFO_DIRNAME) . '/' . pathinfo($file_path, PATHINFO_FILENAME) . '.webp';

    $upload_dir = wp_get_upload_dir();

    $response->data['webp_url'] = file_exists($webp_file)
        ? str_replace($upload_dir['basedir'], $upload_dir['baseurl'], $webp_file)
        : '';

    return $response;
}, 10, 3);

/**
 * Получаем данные для блока Gutenberg
 */
function theme_get_block_image_data($image_id) {
    if (!$image_id) return null;

    $image_url = wp_get_attachment_url($image_id);
    $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);

    $response = wp_prepare_attachment_for_js(get_post($image_id));

    return [
        'url' => $image_url,
        'alt' => $image_alt,
        'responsive' => $response['responsive'] ?? [
            'webp' => '',
            'jpg' => '',
            'default' => $image_url,
        ],
    ];
}
