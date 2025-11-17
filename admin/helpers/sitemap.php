<?php

defined('ABSPATH') || exit;

// === Автоматическая генерация sitemap.xml ===
function generate_dynamic_sitemap() {
  // Путь к файлу sitemap.xml в корне сайта
  $sitemap_file = ABSPATH . 'sitemap.xml';

  // Получаем все публичные страницы и посты
  $posts_for_sitemap = get_posts([
    'numberposts' => -1,
    'post_type'   => ['page', 'post'],
    'post_status' => 'publish',
    'orderby'     => 'modified',
  ]);

  // Начало XML
  $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
  $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

  // Главная
  $sitemap .= "  <url>\n";
  $sitemap .= "    <loc>" . esc_url(home_url('/')) . "</loc>\n";
  $sitemap .= "    <lastmod>" . date('c') . "</lastmod>\n";
  $sitemap .= "    <priority>1.0</priority>\n";
  $sitemap .= "  </url>\n";

  // Остальные страницы и посты
  foreach ($posts_for_sitemap as $post) {
    $url = get_permalink($post);
    $lastmod = get_post_modified_time('c', true, $post);

    $sitemap .= "  <url>\n";
    $sitemap .= "    <loc>" . esc_url($url) . "</loc>\n";
    $sitemap .= "    <lastmod>" . esc_html($lastmod) . "</lastmod>\n";
    $sitemap .= "    <priority>0.8</priority>\n";
    $sitemap .= "  </url>\n";
  }

  // --- Кастомные статические URL (опционально) ---
  // Можно добавить вручную, если есть что-то вне WP:
  /*
  $static_urls = [
    'https://tvoysite.ru/politika-konfidencialnosti/',
    'https://tvoysite.ru/specialnaya-stranica/',
  ];
  foreach ($static_urls as $static_url) {
    $sitemap .= "  <url>\n";
    $sitemap .= "    <loc>$static_url</loc>\n";
    $sitemap .= "    <lastmod>" . date('c') . "</lastmod>\n";
    $sitemap .= "    <priority>0.5</priority>\n";
    $sitemap .= "  </url>\n";
  }
  */

  // Конец XML
  $sitemap .= '</urlset>';

  // Сохраняем файл
  file_put_contents($sitemap_file, $sitemap);
}

// Генерация sitemap при публикации или обновлении поста/страницы
add_action('save_post', 'generate_dynamic_sitemap');

// Генерация sitemap при активации темы
add_action('after_switch_theme', 'generate_dynamic_sitemap');

// Генерация при инициализации (на всякий случай, если файл отсутствует)
add_action('init', function() {
  $sitemap_file = ABSPATH . 'sitemap.xml';
  if (!file_exists($sitemap_file)) {
    generate_dynamic_sitemap();
  }
});