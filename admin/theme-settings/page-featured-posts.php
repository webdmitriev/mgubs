<?php
if (!defined('ABSPATH')) exit;

function theme_featured_posts_page_content() {
  $selected = get_option('theme_featured_posts', []);

  // Все посты для поиска
  $all_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'DESC'
  ]);
?>
<div class="wrap">
  <h1>Выбранные новостные посты</h1>

  <form method="post" action="options.php">
    <?php settings_fields('theme_featured_posts_group'); ?>

    <!-- Поиск -->
    <div class="featured-search">
      <input
        type="text"
        id="post-search"
        placeholder="Начните вводить название поста…"
        autocomplete="off"
      >
      <div id="search-results"></div>
    </div>

    <!-- Выбранные посты -->
    <div class="featured-selected">
      <?php foreach ($selected as $id):
        $thumb = get_the_post_thumbnail_url($id, 'thumbnail');
        if (!$thumb) {
          $thumb = get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg';
        }
      ?>
        <div class="post-item" data-id="<?php echo $id; ?>">
          <img src="<?php echo esc_url($thumb); ?>">
          <span class="post-title"><?php echo esc_html(get_the_title($id)); ?></span>

          <span class="move-btn" data-dir="up"></span>
          <span class="move-btn" data-dir="down"></span>
          <span class="remove-btn"></span>

          <input type="hidden" name="theme_featured_posts[]" value="<?php echo $id; ?>">
        </div>
      <?php endforeach; ?>
    </div>

    <?php submit_button(); ?>
  </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {

  const allPosts = <?php
    echo json_encode(array_map(fn($p) => [
      'id'    => $p->ID,
      'title' => $p->post_title,
      'thumb' => get_the_post_thumbnail_url($p->ID, 'thumbnail')
        ?: get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg'
    ], $all_posts));
  ?>;

  const searchInput   = document.getElementById('post-search');
  const resultsBox   = document.getElementById('search-results');
  const selectedWrap = document.querySelector('.featured-selected');

  function getSelectedIds() {
    return [...selectedWrap.querySelectorAll('input')]
      .map(i => i.value);
  }

  function createSelectedPost(post) {
    const div = document.createElement('div');
    div.className = 'post-item';
    div.dataset.id = post.id;

    div.innerHTML = `
      <img src="${post.thumb}">
      <span class="post-title">${post.title}</span>
      <span class="move-btn" data-dir="up"></span>
      <span class="move-btn" data-dir="down"></span>
      <span class="remove-btn"></span>
      <input type="hidden" name="theme_featured_posts[]" value="${post.id}">
    `;

    attachItemEvents(div);
    return div;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsBox.innerHTML = '';

    if (query.length < 2) return;

    const selectedIds = getSelectedIds();

    allPosts
      .filter(p =>
        p.title.toLowerCase().includes(query) &&
        !selectedIds.includes(String(p.id))
      )
      .slice(0, 10)
      .forEach(post => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.textContent = post.title;

        item.onclick = () => {
          selectedWrap.appendChild(createSelectedPost(post));
          searchInput.value = '';
          resultsBox.innerHTML = '';
        };

        resultsBox.appendChild(item);
      });
  });

  function attachItemEvents(item) {

    item.querySelector('.remove-btn').onclick = () => item.remove();

    item.querySelectorAll('.move-btn').forEach(btn => {
      btn.onclick = () => {
        const dir = btn.dataset.dir;
        if (dir === 'up' && item.previousElementSibling) {
          item.parentNode.insertBefore(item, item.previousElementSibling);
        }
        if (dir === 'down' && item.nextElementSibling) {
          item.parentNode.insertBefore(item.nextElementSibling, item);
        }
      };
    });
  }

  document.querySelectorAll('.featured-selected .post-item')
    .forEach(attachItemEvents);
});
</script>

<style>
.featured-search {
  position: relative;
  max-width: 800px;
  margin-bottom: 30px;
}

#post-search {
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
}

#search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 10;
}

.search-item {
  padding: 8px 12px;
  cursor: pointer;
}

.search-item:hover {
  background: #f0f0f0;
}

.featured-selected {
  max-width: 800px;
  background: #fff;
  border: 1px solid #ccc;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.post-item img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.post-title {
  flex: 1;
}

.move-btn,
.remove-btn {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.move-btn[data-dir="up"] {
  background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-arrow.svg') center/contain no-repeat;
}

.move-btn[data-dir="down"] {
  background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-arrow.svg') center/contain no-repeat;
  transform: rotate(180deg);
}

.remove-btn {
  background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-close.svg') center/contain no-repeat;
}
</style>

<?php } ?>
