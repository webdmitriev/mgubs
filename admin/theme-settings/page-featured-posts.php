<?php
if (!defined('ABSPATH')) exit;

function theme_featured_posts_page_content() {
  $selected = get_option('theme_featured_posts', []);


  // Получаем все посты
  $all_posts = get_posts([
    'post_type' => 'post',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'DESC'
  ]);
?>
<div class="wrap">
  <h1>Новостные посты</h1>

  <form method="post" action="options.php">
    <?php settings_fields('theme_featured_posts_group'); ?>

    <div class="columns-wrapper">
      <!-- Left Column -->
      <div class="posts-column">
        <h2>Все новости</h2>
        <div class="posts-column__items">
          <?php foreach ($all_posts as $post): if (!in_array($post->ID, $selected)):
            $thumb = get_the_post_thumbnail_url($post->ID, 'thumbnail');
            if (!$thumb) { $thumb = get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg'; }
          ?>
            <div class="post-item" data-id="<?php echo $post->ID; ?>" data-thumb="<?php echo $thumb; ?>">
              <img src="<?php echo $thumb; ?>" class="post-thumb">
              <span class="post-title"><?php echo esc_html($post->post_title); ?></span>
            </div>
          <?php endif; endforeach; ?>
        </div>
      </div>

      <!-- Right Column -->
      <div class="posts-column" id="selected-posts">
        <h2>Выбранные новости</h2>
        <div class="posts-column__items">
          <?php foreach ($selected as $id):
            $thumb = get_the_post_thumbnail_url($id, 'thumbnail');
            if (!$thumb) { $thumb = get_template_directory_uri() . '/assets/img/default/logotype-mgubs.svg'; }
          ?>
            <div class="post-item" data-id="<?php echo $id; ?>" data-thumb="<?php echo $thumb; ?>">
              <img src="<?php echo $thumb; ?>" class="post-thumb">
              <span class="post-title"><?php echo get_the_title($id); ?></span>

              <span class="move-btn" data-dir="up"></span>
              <span class="move-btn" data-dir="down"></span>
              <span class="remove-btn"></span>
              <input type="hidden" name="theme_featured_posts[]" value="<?php echo $id; ?>">
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>

    <?php submit_button(); ?>
  </form>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {

    function createSelectedPost(id, title, thumb) {
      const div = document.createElement('div');
      div.className = 'post-item';
      div.dataset.id = id;
      div.dataset.thumb = thumb;

      div.innerHTML = `
        <img src="${thumb}" class="post-thumb">
        <span class="post-title">${title}</span>
        <span class="move-btn" data-dir="up"></span>
        <span class="move-btn" data-dir="down"></span>
        <span class="remove-btn"></span>
        <input type="hidden" name="theme_featured_posts[]" value="${id}">
      `;

      return div;
    }


    // Клик по посту в левом списке → перенос в правый
    document.querySelectorAll('.columns-wrapper .posts-column:first-child .post-item')
      .forEach(item => {
        item.addEventListener('click', function () {
          const id = this.dataset.id;
          const title = this.querySelector('.post-title').textContent.trim();
          console.log(title);
          const thumb = this.dataset.thumb;

          const selected = document.getElementById('selected-posts');
          const newItem = createSelectedPost(id, title, thumb);

          selected.appendChild(newItem);
          this.remove();
          attachEvents();
        });
      });

    function attachEvents() {

      // Удаление
      document.querySelectorAll('#selected-posts .remove-btn').forEach(btn => {
        btn.onclick = function () {
          const item = this.closest('.post-item');

          const leftColumn = document.querySelector('.columns-wrapper .posts-column:first-child .posts-column__items');
          const title = item.querySelector('.post-title').textContent.trim();
          const thumb = item.dataset.thumb;

          // Создаём новый элемент для левой колонки
          const newItem = document.createElement('div');
          newItem.className = 'post-item';
          newItem.dataset.id = item.dataset.id;
          newItem.dataset.thumb = thumb;

          // Внутренний HTML
          newItem.innerHTML = `
            ${thumb ? `<img src="${thumb}" class="thumb">` : ''}
            <span class="post-title">${title}</span>
          `;

          leftColumn.appendChild(newItem);

          // Удаляем элемент из выбранных
          item.remove();

          // Повторно навешиваем события (клик на переноса/удаление и т.д.)
          attachEvents();
        };
      });

      // Перемещение
      document.querySelectorAll('#selected-posts .move-btn').forEach(btn => {
        btn.onclick = function () {
          const item = this.closest('.post-item');
          const dir = this.dataset.dir;

          if (dir === 'up' && item.previousElementSibling) {
            item.parentNode.insertBefore(item, item.previousElementSibling);
          }

          if (dir === 'down' && item.nextElementSibling) {
            item.parentNode.insertBefore(item.nextElementSibling, item);
          }
        };
      });
    }

    attachEvents();
  });
</script>


<style>
  .columns-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-self: flex-start;
    align-items: stretch;
    gap: 40px;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    * {
          box-sizing: border-box;
    }
  }
  .posts-column {
    width: 100%;
    max-width: calc(50% - 22px);
    padding: 20px;
    border: 1px solid #ccc;
    background: #fff;
    min-height: 400px;
  }
  .post-item {
    display: flex;
    flex-wrap: wrap;
    justify-self: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .post-item:hover {
    background: #f5f5f5;
  }
  .post-item img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 10px;
    vertical-align: middle;
    border-radius: 4px;
  }
  .post-item .post-title {
    display: block;
    width: 100%;
    max-width: calc(100% - 169px);
  }
  .post-item .move-btn, .post-item .remove-btn {
    display: flex;
    flex-wrap: wrap;
    justify-self: center;
    align-items: center;
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
  .post-item .move-btn[data-dir="up"] {
    background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-arrow.svg') center / contain no-repeat;
  }
  .post-item .move-btn[data-dir="down"] {
    background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-arrow.svg') center / contain no-repeat;
    transform: rotate(180deg);
  }
  .post-item .remove-btn {
    background: url('<?php echo get_template_directory_uri(); ?>/admin/assets/img/icons/admin-close.svg') center / contain no-repeat;
  }
</style>

<?php
}
