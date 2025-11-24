<?php
defined('ABSPATH') || exit;

// // Вместо the_post_thumbnail()
// echo theme_get_responsive_thumbnail();

// // С дополнительными классами
// echo theme_get_responsive_thumbnail(null, 'full', [
//     'class' => 'my-custom-class',
//     'alt' => 'Кастомный alt текст'
// ]);

// // Для конкретного поста
// echo theme_get_responsive_thumbnail(123, 'full');

/**
 * Функция для вывода responsive изображения вместо стандартного get_the_post_thumbnail
 * 
 * @param int $post_id ID поста
 * @param string $size Размер изображения (не используется напрямую, оставлен для совместимости)
 * @param array $attr Дополнительные атрибуты
 * @return string HTML код изображения
 */
function theme_get_responsive_thumbnail($post_id = null, $size = 'full', $attr = []) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    if (!$post_id) {
        return '';
    }
    
    $thumbnail_id = get_post_thumbnail_id($post_id);
    
    if (!$thumbnail_id) {
        return '';
    }
    
    return theme_get_responsive_image($thumbnail_id, $attr);
}

/**
 * Функция для вывода responsive изображения по ID вложения
 * 
 * @param int $attachment_id ID изображения
 * @param array $attr Дополнительные атрибуты
 * @return string HTML код изображения
 */
function theme_get_responsive_image($attachment_id, $attr = []) {
    if (!$attachment_id) {
        return '';
    }
    
    // Получаем данные изображения через нашу функцию
    $image_data = theme_get_block_image_data($attachment_id);
    
    if (!$image_data) {
        return '';
    }
    
    $default_attr = [
        'alt' => $image_data['alt'] ?: '',
        'class' => '',
        'loading' => 'lazy',
        'sizes' => '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px'
    ];
    
    $attr = wp_parse_args($attr, $default_attr);
    
    $responsive = $image_data['responsive'];
    $webp_srcset = $responsive['webp'];
    $jpg_srcset = $responsive['jpg'];
    $default_src = $responsive['default'];
    
    // Если нет responsive данных, возвращаем обычное изображение
    if (empty($webp_srcset) && empty($jpg_srcset)) {
        return wp_get_attachment_image($attachment_id, 'full', false, $attr);
    }
    
    // Собираем HTML
    $html = '<picture>';
    
    // WebP источник если есть
    if (!empty($webp_srcset)) {
        $html .= '<source type="image/webp" srcset="' . esc_attr($webp_srcset) . '" sizes="' . esc_attr($attr['sizes']) . '">';
    }
    
    // JPG/PNG источник
    $srcset = !empty($jpg_srcset) ? $jpg_srcset : $default_src;
    $html .= '<img src="' . esc_url($default_src) . '" 
                   srcset="' . esc_attr($srcset) . '" 
                   sizes="' . esc_attr($attr['sizes']) . '" 
                   alt="' . esc_attr($attr['alt']) . '" 
                   class="' . esc_attr($attr['class']) . '" 
                   loading="' . esc_attr($attr['loading']) . '"';
    
    // Добавляем остальные атрибуты
    foreach ($attr as $name => $value) {
        if (!in_array($name, ['alt', 'class', 'loading', 'sizes', 'srcset']) && $value) {
            $html .= ' ' . esc_attr($name) . '="' . esc_attr($value) . '"';
        }
    }
    
    $html .= '>';
    $html .= '</picture>';
    
    return $html;
}

/**
 * Упрощенная функция для получения URL изображения с fallback
 * 
 * @param int $post_id ID поста
 * @param string $size_name Название размера (480, 768, 1280, 1920)
 * @return string URL изображения
 */
function theme_get_thumbnail_url($post_id = null, $size_name = '1920') {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    if (!$post_id) {
        return '';
    }
    
    $thumbnail_id = get_post_thumbnail_id($post_id);
    
    if (!$thumbnail_id) {
        return '';
    }
    
    return theme_get_image_url_by_size($thumbnail_id, $size_name);
}

/**
 * Получение URL изображения определенного размера
 * 
 * @param int $attachment_id ID изображения
 * @param string $size_name Размер (480, 768, 1280, 1920)
 * @return string URL изображения
 */
function theme_get_image_url_by_size($attachment_id, $size_name = '1920') {
    if (!$attachment_id) {
        return '';
    }
    
    $file = get_attached_file($attachment_id);
    
    if (!$file || !file_exists($file)) {
        return '';
    }
    
    $upload = wp_get_upload_dir();
    $dir = pathinfo($file, PATHINFO_DIRNAME);
    $name = pathinfo($file, PATHINFO_FILENAME);
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    
    // Ищем файл с нужным размером
    $size_file = "{$dir}/{$name}-{$size_name}.{$ext}";
    
    if (file_exists($size_file)) {
        return str_replace($upload['basedir'], $upload['baseurl'], $size_file);
    }
    
    // Fallback на оригинальный файл
    return wp_get_attachment_url($attachment_id);
}

/**
 * Получение URL WebP версии изображения
 * 
 * @param int $post_id ID поста
 * @param string $size_name Размер (480, 768, 1280, 1920)
 * @return string URL WebP изображения
 */
function theme_get_webp_thumbnail_url($post_id = null, $size_name = '1920') {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    if (!$post_id) {
        return '';
    }
    
    $thumbnail_id = get_post_thumbnail_id($post_id);
    
    if (!$thumbnail_id) {
        return '';
    }
    
    return theme_get_webp_image_url($thumbnail_id, $size_name);
}

/**
 * Получение URL WebP версии изображения по размеру
 * 
 * @param int $attachment_id ID изображения
 * @param string $size_name Размер (480, 768, 1280, 1920)
 * @return string URL WebP изображения
 */
function theme_get_webp_image_url($attachment_id, $size_name = '1920') {
    if (!$attachment_id) {
        return '';
    }
    
    $file = get_attached_file($attachment_id);
    
    if (!$file || !file_exists($file)) {
        return '';
    }
    
    $upload = wp_get_upload_dir();
    $dir = pathinfo($file, PATHINFO_DIRNAME);
    $name = pathinfo($file, PATHINFO_FILENAME);
    
    // Ищем WebP файл
    $webp_file = "{$dir}/{$name}-{$size_name}.webp";
    
    if (file_exists($webp_file)) {
        return str_replace($upload['basedir'], $upload['baseurl'], $webp_file);
    }
    
    return '';
}