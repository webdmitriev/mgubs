<?php

defined('ABSPATH') || exit;

function theme_register_seo_meta_fields() {
  $fields = [
    '_seo_description',
    '_seo_keywords',
    '_seo_canonical_url',
    '_og_title',
    '_og_description',
    '_og_image',
    '_twitter_title',
    '_twitter_description',
    '_twitter_image',
  ];

  // Явно указываем поддерживаемые post_types
  $post_types = ['post', 'page', 'allevents'];

  foreach ($post_types as $post_type) {
    foreach ($fields as $field) {
      register_post_meta($post_type, $field, [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
          return current_user_can('edit_posts');
        },
      ]);
    }
  }
}
add_action('init', 'theme_register_seo_meta_fields');


// === SEO META TAGS + SCHEMA.ORG ===
function my_seo_meta_tags() {
  if (is_admin()) return;

  global $post;
  if (!$post) return;

  // --- Получаем meta-поля (новая система) ---
  $final_title      = get_the_title($post->ID);
  $seo_description  = get_post_meta($post->ID, '_seo_description', true);
  $seo_keywords     = get_post_meta($post->ID, '_seo_keywords', true);

  $og_title         = get_post_meta($post->ID, '_og_title', true);
  $og_description   = get_post_meta($post->ID, '_og_description', true);
  $og_image         = get_post_meta($post->ID, '_og_image', true);

  $twitter_title       = get_post_meta($post->ID, '_twitter_title', true);
  $twitter_description = get_post_meta($post->ID, '_twitter_description', true);
  $twitter_image       = get_post_meta($post->ID, '_twitter_image', true);

  // --- SCHEMA.ORG данные (если хочешь, можешь перенести их в "Настройки сайта") ---
  $schema_name              = get_option('schema_name');
  $schema_street_address    = get_option('schema_street_address');
  $schema_address_locality  = get_option('schema_address_locality');
  $schema_address_region    = get_option('schema_address_region');
  $schema_postal_code       = get_option('schema_postal_code');
  $schema_address_country   = get_option('schema_address_country');

  // --- Фолбэки ---
  $default_title       = get_bloginfo('name');
  $default_description = get_bloginfo('description');
  $current_url         = get_permalink($post->ID);

  // --- Meta description ---
  $final_description = $seo_description ?: $default_description;
  echo '<meta name="description" content="' . esc_attr($final_description) . "\">\n";

  // --- Keywords ---
  if ($seo_keywords) {
    echo '<meta name="keywords" content="' . esc_attr($seo_keywords) . "\">\n";
  }

  // --- Canonical ---
  echo '<link rel="canonical" href="' . esc_url($current_url) . "\">\n";

  // --- Open Graph ---
  echo '<meta property="og:type" content="website">' . "\n";
  echo '<meta property="og:title" content="' . esc_attr($og_title ?: $final_title) . '">' . "\n";
  echo '<meta property="og:description" content="' . esc_attr($og_description ?: $final_description) . '">' . "\n";
  echo '<meta property="og:url" content="' . esc_url($current_url) . '">' . "\n";

  if ($og_image) {
    echo '<meta property="og:image" content="' . esc_url($og_image) . '">' . "\n";
  }

  // --- Twitter ---
  echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
  echo '<meta name="twitter:title" content="' . esc_attr($twitter_title ?: $final_title) . '">' . "\n";
  echo '<meta name="twitter:description" content="' . esc_attr($twitter_description ?: $final_description) . '">' . "\n";
  if ($twitter_image) {
    echo '<meta name="twitter:image" content="' . esc_url($twitter_image) . '">' . "\n";
  }

  // --- SCHEMA.ORG JSON-LD ---
  $schema = [
    "@context" => "https://schema.org",
    "@type" => "LocalBusiness",
    "name" => esc_attr($schema_name) ?: $default_title,
    "image" => $og_image ? esc_url($og_image) : get_site_icon_url(),
    "url" => $current_url,
    "telephone" => "", // 👉 вставь свой номер
    "address" => [
      "@type" => "PostalAddress",
      "streetAddress" => esc_attr($schema_street_address) ?: "",
      "addressLocality" => esc_attr($schema_address_locality) ?: "",
      "addressRegion" => esc_attr($schema_address_region) ?: "",
      "postalCode" => esc_attr($schema_postal_code) ?: "",
      "addressCountry" => esc_attr($schema_address_country) ?: "RU"
    ],
    "openingHours" => ["Mo-Su 08:00-22:00"],
    "priceRange" => "₽₽"
  ];

  // --- Если это статья (пост в блоге), добавим Article schema ---
  if (is_single()) {
    $schema_article = [
      "@context" => "https://schema.org",
      "@type" => "Article",
      "headline" => $final_title,
      "description" => $final_description,
      "author" => [
        "@type" => "Organization",
        "name" => $default_title,
      ],
      "publisher" => [
        "@type" => "Organization",
        "name" => $default_title,
        "logo" => [
          "@type" => "ImageObject",
          "url" => get_site_icon_url()
        ]
      ],
      "datePublished" => get_the_date('c', $post->ID),
      "dateModified" => get_the_modified_date('c', $post->ID),
      "mainEntityOfPage" => $current_url
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema_article, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
  }

  // --- Выводим LocalBusiness ---
  echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\n";
}
add_action('wp_head', 'my_seo_meta_tags', 5);
