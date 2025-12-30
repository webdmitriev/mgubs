<?php

// === Кастомные категории ===
add_filter( 'block_categories_all', 'theme_register_block_categories', 10, 2 );
function theme_register_block_categories( $categories, $context ) {
  // не дублируем, если уже добавлены
  $has_custom = wp_list_filter( $categories, [ 'slug' => 'webdmitriev' ] );
  if ( ! empty( $has_custom ) ) {
    return $categories;
  }

  return array_merge(
    $categories,
    [
      [
        'slug'  => 'main-blocks',
        'title' => __( 'Главные блоки', 'theme' ),
        'icon'  => 'star-filled',
      ],
      [
        'slug'  => 'contact-blocks',
        'title' => __( 'Contact form', 'theme' ),
        'icon'  => 'layout',
      ],
      [
        'slug'  => 'content-blocks',
        'title' => __( 'Контент', 'theme' ),
        'icon'  => 'layout',
      ],
      [
        'slug'  => 'pages-blocks',
        'title' => __( 'Наполненные блоки', 'theme' ),
        'icon'  => 'layout',
      ],
    ]
  );
}

// === Разрешаем только нужные блоки ===
add_filter( 'allowed_block_types_all', 'theme_allowed_blocks', 10, 2 );
function theme_allowed_blocks( $allowed_blocks, $editor_context ) {
  return [
    'theme/block-01',
    'theme/block-02',
    'theme/block-03',
    'theme/block-04',
    'theme/block-05',
    'theme/block-06',
    'theme/block-07',
    'theme/block-08',
    'theme/block-09',
    'theme/block-10',
    'theme/block-11',
    'theme/block-12',
    'theme/block-13',
    'theme/block-14',
    'theme/block-15',
    'theme/block-16',
    'theme/block-17',
    'theme/block-18',
    'theme/block-19',
    'theme/block-20',
    'theme/block-21',
    'theme/block-22',
    'theme/block-23',
    'theme/block-24',
    'theme/block-25',
    'theme/block-26',
    'theme/block-27',

    'core/paragraph',
    'core/list',
    'core/list-item',
    'core/quote',
    'core/table',
    'core/code',
    'core/spacer',
  ];
}
