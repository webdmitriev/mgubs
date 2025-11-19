<?php

defined('ABSPATH') || exit;

add_action('after_setup_theme', function() {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();

  $table_categories = $wpdb->prefix . 'media_categories';
  $table_relationships = $wpdb->prefix . 'media_category_relationships';

  $sql1 = "CREATE TABLE IF NOT EXISTS $table_categories (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    parent_id BIGINT(20) UNSIGNED DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY slug (slug)
  ) $charset_collate;";

  $sql2 = "CREATE TABLE IF NOT EXISTS $table_relationships (
    media_id BIGINT(20) UNSIGNED NOT NULL,
    category_id BIGINT(20) UNSIGNED NOT NULL,
    PRIMARY KEY (media_id, category_id),
    KEY category_id (category_id)
  ) $charset_collate;";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta($sql1);
  dbDelta($sql2);
});


// Создаем меню в админке
add_action('admin_menu', function() {
  add_menu_page(
    'Кат. медиа',       // Заголовок страницы
    'Кат. медиа',       // Название меню
    'manage_options',            // Права доступа
    'media_categories',          // slug страницы
    'render_media_categories_page', // callback для отображения
    'dashicons-category',        // иконка
    11                           // позиция
  );
});

// 2
function render_media_categories_page() {
  global $wpdb;
  $table = $wpdb->prefix . 'media_categories';

  // Сохраняем новую категорию
  if (isset($_POST['action']) && $_POST['action'] === 'add_category') {
    $name = sanitize_text_field($_POST['name']);
    $slug = sanitize_title($_POST['slug']);
    $parent_id = intval($_POST['parent_id']);

    $wpdb->insert(
      $table,
      [
        'name' => $name,
        'slug' => $slug,
        'parent_id' => $parent_id ?: null
      ]
    );
    echo '<div class="updated"><p>Категория добавлена!</p></div>';
  }

  // Получаем все категории
  $categories = $wpdb->get_results("SELECT * FROM $table ORDER BY parent_id, name");

  ?>
  <div class="wrap">
    <h1>Категории медиатеки</h1>
    <form method="post">
      <input type="hidden" name="action" value="add_category">
      <table class="form-table">
        <tr>
          <th>Название</th>
          <td><input type="text" name="name" required></td>
        </tr>
        <tr>
          <th>Slug</th>
          <td><input type="text" name="slug" required></td>
        </tr>
        <tr>
          <th>Родительская категория</th>
          <td>
            <select name="parent_id">
              <option value="">Нет</option>
              <?php foreach ($categories as $cat): ?>
                <option value="<?= $cat->id ?>"><?= esc_html($cat->name) ?></option>
              <?php endforeach; ?>
            </select>
          </td>
        </tr>
      </table>
      <p><input type="submit" class="button button-primary" value="Добавить категорию"></p>
    </form>

    <h2>Список категорий</h2>
    <table class="wp-list-table widefat fixed striped">
      <thead>
        <tr><th>ID</th><th>Название</th><th>Slug</th><th>Родитель</th></tr>
      </thead>
      <tbody>
        <?php foreach ($categories as $cat): ?>
          <tr>
            <td><?= $cat->id ?></td>
            <td><?= esc_html($cat->name) ?></td>
            <td><?= esc_html($cat->slug) ?></td>
            <td>
              <?php
              if ($cat->parent_id) {
                $parent = $wpdb->get_row("SELECT name FROM $table WHERE id = {$cat->parent_id}");
                echo esc_html($parent->name);
              } else {
                echo '-';
              }
              ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
  <?php
}

// 3
// Добавляем блок категорий в окно редактирования attachment
add_filter('attachment_fields_to_edit', function($form_fields, $post) {
  global $wpdb;
  $table_categories = $wpdb->prefix . 'media_categories';
  $table_rel = $wpdb->prefix . 'media_category_relationships';

  // Получаем все категории
  $categories = $wpdb->get_results("SELECT * FROM $table_categories ORDER BY parent_id, name");

  // Получаем выбранные категории для данного attachment
  $selected = $wpdb->get_col(
    $wpdb->prepare(
      "SELECT category_id FROM $table_rel WHERE media_id = %d",
      $post->ID
    )
  );

  ob_start();
  ?>
  <div style="max-height:200px; overflow:auto; padding:6px; border:1px solid #ddd; background:#fff;">
    <?php foreach ($categories as $cat): ?>
      <label style="display:block; margin-bottom:4px;">
        <input type="checkbox"
          name="attachments[<?= $post->ID ?>][media_categories][]"
          value="<?= $cat->id ?>"
          <?= in_array($cat->id, $selected) ? 'checked' : '' ?>>

        <?= esc_html($cat->name) ?>
      </label>
    <?php endforeach; ?>
  </div>
  <?php

  $html = ob_get_clean();

  $form_fields['media_categories'] = [
    'label' => 'Категории медиатеки',
    'input' => 'html',
    'html'  => $html,
  ];

  return $form_fields;
}, 10, 2);

// Сохраняем выбранные категории
add_filter('attachment_fields_to_save', function($post, $attachment) {
  global $wpdb;
  $table_rel = $wpdb->prefix . 'media_category_relationships';

  // Удаляем старые связи
  $wpdb->delete($table_rel, ['media_id' => $post['ID']]);

  // Если нет новых категорий — выходим
  if (
    !isset($attachment['media_categories']) ||
    !is_array($attachment['media_categories'])
  ) {
    return $post;
  }

  // Сохраняем новые категории
  foreach ($attachment['media_categories'] as $cat_id) {
    $wpdb->insert($table_rel, [
      'media_id' => $post['ID'],
      'category_id' => intval($cat_id),
    ]);
  }

  return $post;
}, 10, 2);


// ✔ 4.1. Добавляем select-фильтр в медиатеку
add_action('restrict_manage_posts', function() {
  global $pagenow, $wpdb;

  if ($pagenow !== 'upload.php') {
    return;
  }

  $table_categories = $wpdb->prefix . 'media_categories';
  $categories = $wpdb->get_results("SELECT * FROM $table_categories ORDER BY parent_id, name");

  $current = isset($_GET['media_category']) ? intval($_GET['media_category']) : 0;

  echo '<select name="media_category">';
  echo '<option value="0">Все категории</option>';

  foreach ($categories as $cat) {
    echo '<option value="' . $cat->id . '" ' . selected($current, $cat->id, false) . '>';
    echo esc_html($cat->name);
    echo '</option>';
  }

  echo '</select>';
});


// ✔ 4.2. Фильтруем медиабиблиотеку по категории
add_action('pre_get_posts', function($query) {
  global $pagenow, $wpdb;

  if (!is_admin() || $pagenow !== 'upload.php') {
    return;
  }

  if (!isset($_GET['media_category']) || intval($_GET['media_category']) === 0) {
    return;
  }

  $category_id = intval($_GET['media_category']);
  $table_rel = $wpdb->prefix . 'media_category_relationships';

  // Получаем все media_id, у которых есть эта категория
  $media_ids = $wpdb->get_col(
    $wpdb->prepare(
      "SELECT media_id FROM $table_rel WHERE category_id = %d",
      $category_id
    )
  );

  // Если нет медиа в категории — показываем пустой список
  if (empty($media_ids)) {
    // Невозможный ID, чтобы WP показал 0 результатов
    $media_ids = [0];
  }

  // Фильтруем запрос WP
  $query->set('post__in', $media_ids);
  $query->set('post_type', 'attachment');
});


// ✔ 5.1. Добавляем JS для фильтра в grid + modal
add_action('admin_enqueue_scripts', function() {
  wp_enqueue_script(
    'media-categories-js',
    get_stylesheet_directory_uri() . '/admin/mediateka/media-categories.js',
    ['media-views'], // важно!
    false,
    true
  );
});


// ✔ 5.3. Передаём список категорий в JS
add_action('admin_enqueue_scripts', function() {
  global $wpdb;
  $table = $wpdb->prefix . 'media_categories';
  $cats = $wpdb->get_results("SELECT * FROM $table ORDER BY name");

  wp_localize_script('media-categories-js', 'mediaCategoriesList', $cats);
});


// ✔ 5.4. PHP: ловим AJAX-фильтр и модифицируем WP_Query
add_filter('ajax_query_attachments_args', function($query) {
  // проверяем новое расположение параметра
  if (!empty($_REQUEST['query']['media_category'])) {

    $cat = intval($_REQUEST['query']['media_category']);

    error_log("FOUND media_category in query[]: $cat");

    global $wpdb;
    $table_rel = $wpdb->prefix . 'media_category_relationships';

    $media_ids = $wpdb->get_col(
      $wpdb->prepare(
        "SELECT media_id FROM $table_rel WHERE category_id = %d", 
        $cat
      )
    );

    if (empty($media_ids)) {
      $media_ids = [0]; // чтобы ничего не выводилось
    }

    $query['post__in'] = $media_ids;
  }

  return $query;
});




/**
 * Возвращает список категорий медиатеки из кастомной таблицы wp_media_categories
 */
add_action('admin_enqueue_scripts', function($hook){
  if ($hook === 'upload.php' || $hook === 'media-upload.php') {
    wp_enqueue_script(
      'media-category-grid-filter',
      get_stylesheet_directory_uri() . '/admin/mediateka/grid-filter.js',
      ['media-views', 'jquery'],
      false,
      true
    );

    wp_localize_script('media-category-grid-filter', 'mediaCategoriesList', get_media_categories());
  }
});
function get_media_categories() {
  global $wpdb;

  $table = $wpdb->prefix . 'media_categories';

  $rows = $wpdb->get_results("SELECT id, name FROM {$table} ORDER BY name ASC");

  $categories = [];

  if ($rows) {
    foreach ($rows as $row) {
      $categories[] = [
        'id'   => intval($row->id),
        'name' => esc_html($row->name)
      ];
    }
  }

  return $categories;
}

