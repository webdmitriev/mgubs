<?php
// admin/theme-settings/templates/page-settings-template.php
if (!defined('ABSPATH')) exit;
?>

<div class="wrap theme-settings">
  <h1>Настройки темы</h1>

  <form method="post" action="options.php">
    <?php settings_fields('theme_settings_group'); ?>

    <h2>Соц. сети</h2>
    <div id="social-wrapper">
      <?php
      $socials = get_theme_social();
      if (!empty($socials)) : ?>
        <?php foreach ($socials as $index => $social) : ?>
          <div class="social-row">
            <select name="theme_settings[social][<?php echo $index; ?>][icon]" class="social-icon-select">
              <option value="">Выберите иконку</option>
              <option value="vk" <?php selected($social['icon'], 'vk'); ?>>Vk</option>
              <option value="telegram" <?php selected($social['icon'], 'telegram'); ?>>Telegram</option>
              <option value="whatsapp" <?php selected($social['icon'], 'whatsapp'); ?>>WhatsApp</option>
              <option value="youtube" <?php selected($social['icon'], 'youtube'); ?>>Youtube</option>
            </select>
            <input
              type="url"
              name="theme_settings[social][<?php echo $index; ?>][link]"
              value="<?php echo esc_attr($social['link']); ?>"
              placeholder="https://example.com"
            />
            <button type="button" class="button remove-social">Удалить</button>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
    <p><button type="button" class="button add-social">+ Добавить соцсеть</button></p>

    <hr />

    <h2>Дополнительные данные</h2>
    <div class="block-full">
      <p>Краткое описание (для футера)</p>
      <textarea
        name="theme_settings[footer_description]"
        id="footer_description"
        rows="8"
        style="width:100%; max-width:600px;"
      ><?php echo esc_textarea(get_option('theme_settings')['footer_description'] ?? ''); ?></textarea>
    </div>

    <hr />

    <h2>Образовательные программы для footer</h2>
    <div class="block-full">
      <?php
        $options = get_option('theme_settings');
        $selected_program = $options['footer_edu_program'] ?? '';
      ?>
      <select name="theme_settings[footer_edu_program]">
        <option value="">Выберите программу</option>
        <option value="all" <?php selected($selected_program, 'all'); ?>>Все</option>
        <option value="main" <?php selected($selected_program, 'main'); ?>>Главная</option>
        <option value="magistrature" <?php selected($selected_program, 'magistrature'); ?>>Магистратура</option>
        <option value="bachelor" <?php selected($selected_program, 'bachelor'); ?>>Бакалавриат</option>
        <option value="students" <?php selected($selected_program, 'students'); ?>>Студентам</option>
        <option value="international" <?php selected($selected_program, 'international'); ?>>Международный отдел</option>
        <option value="dpo" <?php selected($selected_program, 'dpo'); ?>>ДПО</option>
        <option value="db" <?php selected($selected_program, 'db'); ?>>DB</option>
      </select>
    </div>

    <hr />

    <h2>Логотип сайта</h2>
    <div class="block-full">
      <?php
        $options = get_option('theme_settings');
        $logo_id = $options['site_logo'] ?? '';
        $logo_url = $logo_id ? wp_get_attachment_url($logo_id) : '';
      ?>

      <div style="margin-bottom: 10px;">
        <?php if ($logo_url): ?>
          <img id="logo_preview" src="<?php echo esc_url($logo_url); ?>" alt="Логотип" style="width:180px;height:40px;">
        <?php else: ?>
          <img id="logo_preview" src="" alt="Логотип" style="width:180px;height:40px;display:none;">
        <?php endif; ?>
      </div>

      <input type="hidden" name="theme_settings[site_logo]" id="site_logo" value="<?php echo esc_attr($logo_id); ?>">

      <button type="button" class="button" id="upload_logo_button">Загрузить логотип</button>
      <button type="button" class="button" id="remove_logo_button">Удалить</button>
    </div>

    <hr />

    <h2>Дефолтные логотипы для новостей</h2>
    <div class="block-full">
      <?php
        $options = get_option('theme_settings');
        $is_logotype = $options['is_logotype'] ?? '';
        $is_logotype_url = $is_logotype ? wp_get_attachment_url($is_logotype) : '';
      ?>

      <div style="margin-bottom: 10px;">
        <?php if ($is_logotype_url): ?>
          <img id="is_logotype_preview" src="<?php echo esc_url($is_logotype_url); ?>" alt="Логотип" style="width:60px;height:60px;">
        <?php else: ?>
          <img id="is_logotype_preview" src="" alt="Логотип" style="width:60px;height:60px;display:none;">
        <?php endif; ?>
      </div>

      <input type="hidden" name="theme_settings[is_logotype]" id="is_logotype" value="<?php echo esc_attr($is_logotype); ?>">

      <button type="button" class="button" id="is_logotype_upload_button">Логотип 01</button>
      <button type="button" class="button" id="is_logotype_remove_button">Удалить</button>
    </div>
    <div class="block-full">
      <?php
        $options = get_option('theme_settings');
        $is_logotype_special = $options['is_logotype_special'] ?? '';
        $is_logotype_special_url = $is_logotype_special ? wp_get_attachment_url($is_logotype_special) : '';
      ?>

      <div style="margin-bottom: 10px;">
        <?php if ($is_logotype_special_url): ?>
          <img id="is_logotype_special_preview" src="<?php echo esc_url($is_logotype_special_url); ?>" alt="Логотип" style="width:60px;height:60px;">
        <?php else: ?>
          <img id="is_logotype_special_preview" src="" alt="Логотип" style="width:60px;height:60px;display:none;">
        <?php endif; ?>
      </div>

      <input type="hidden" name="theme_settings[is_logotype_special]" id="is_logotype_special" value="<?php echo esc_attr($is_logotype_special); ?>">

      <button type="button" class="button" id="is_logotype_special_upload_button">Логотип 02</button>
      <button type="button" class="button" id="is_logotype_special_remove_button">Удалить</button>
    </div>

    <hr />


    <?php submit_button(); ?>
  </form>
</div>

<style>
  .theme-settings input[type="text"],
  .theme-settings input[type="url"],
  .theme-settings select {
    width: 100%;
    max-width: 400px;
  }
  .social-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;
  }
  .social-row select,
  .social-row input {
    flex: 1;
  }
</style>

<script>
  (function() {
    const wrapper = document.getElementById('social-wrapper');
    const addBtn = document.querySelector('.add-social');

    if (!wrapper || !addBtn) return;

    addBtn.addEventListener('click', () => {
      const index = wrapper.querySelectorAll('.social-row').length;
      const div = document.createElement('div');
      div.className = 'social-row';
      div.innerHTML = `
        <select name="theme_settings[social][${index}][icon]" class="social-icon-select">
          <option value="">Выберите иконку</option>
          <option value="vk">Vk</option>
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="youtube">Youtube</option>
        </select>
        <input type="url" name="theme_settings[social][${index}][link]" placeholder="https://example.com" />
        <button type="button" class="button remove-social">Удалить</button>
      `;
      wrapper.appendChild(div);
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-social')) {
        e.target.closest('.social-row').remove();
      }
    });
  })();
</script>