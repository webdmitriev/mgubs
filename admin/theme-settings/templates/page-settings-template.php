<?php
// admin/theme-settings/templates/page-settings-template.php
if (!defined('ABSPATH')) exit;
?>

<div class="wrap theme-settings">
  <h1>Theme Settings</h1>

  <form method="post" action="options.php">
    <?php settings_fields('theme_settings_group'); ?>

    <h2>Contact Info</h2>
    <table class="form-table">
      <tr>
        <th scope="row"><label for="theme_settings_contact_phone">Phone</label></th>
        <td>
          <input
            type="text"
            id="theme_settings_contact_phone"
            name="theme_settings[contact_info][phone]"
            value="<?php echo esc_attr($contact_info['phone']); ?>"
            class="regular-text"
          />
        </td>
      </tr>
      <tr>
        <th scope="row"><label for="theme_settings_contact_email">Email</label></th>
        <td>
          <input
            type="email"
            id="theme_settings_contact_email"
            name="theme_settings[contact_info][email]"
            value="<?php echo esc_attr($contact_info['email']); ?>"
            class="regular-text"
          />
        </td>
      </tr>
    </table>

    <hr />

    <h2>Partners</h2>
    <div id="partners-wrapper">
      <?php if (!empty($partners)) : ?>
        <?php foreach ($partners as $index => $partner) : ?>
          <div class="partner-row">
            <input
              type="text"
              name="theme_settings[partners][<?php echo $index; ?>][text]"
              value="<?php echo esc_attr($partner['text']); ?>"
              placeholder="Partner name"
            />
            <input
              type="url"
              name="theme_settings[partners][<?php echo $index; ?>][link]"
              value="<?php echo esc_attr($partner['link']); ?>"
              placeholder="https://partner-link.com"
            />
            <button type="button" class="button remove-partner">Remove</button>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>

    <p><button type="button" class="button add-partner">+ Add Partner</button></p>

    <?php submit_button(); ?>
  </form>
</div>

<style>
  .theme-settings input[type="text"],
  .theme-settings input[type="url"],
  .theme-settings input[type="email"] {
    width: 100%;
    max-width: 400px;
  }
  .partner-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .partner-row input {
    flex: 1;
  }
</style>

<script>
  (function() {
    const wrapper = document.getElementById('partners-wrapper');
    const addBtn = document.querySelector('.add-partner');

    if (!wrapper || !addBtn) return;

    addBtn.addEventListener('click', () => {
      const index = wrapper.querySelectorAll('.partner-row').length;
      const div = document.createElement('div');
      div.className = 'partner-row';
      div.innerHTML = `
        <input type="text" name="theme_settings[partners][${index}][text]" placeholder="Partner name" />
        <input type="url" name="theme_settings[partners][${index}][link]" placeholder="https://partner-link.com" />
        <button type="button" class="button remove-partner">Remove</button>
      `;
      wrapper.appendChild(div);
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-partner')) {
        e.target.closest('.partner-row').remove();
      }
    });
  })();
</script>
