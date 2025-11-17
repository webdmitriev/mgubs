<?php
if (!defined('ABSPATH')) exit;
?>

<div class="wrap theme-settings">
  <h1>Добавление кода в head</h1>

  <form method="post" action="options.php">
    <?php
    settings_fields('theme_settings_group');
    $options = get_option('theme_settings');
    $yandex_metric = isset($options['yandex_metric']) ? $options['yandex_metric'] : '';
    ?>

    <table class="form-table">
      <tr>
        <th scope="row">
          <label for="theme_settings_yandex_metric">Код Яндекс.Метрики</label>
        </th>
        <td>
          <textarea
            rows="10"
            id="theme_settings_yandex_metric"
            name="theme_settings[yandex_metric]"
            class="large-text code"
            placeholder="Вставьте код Яндекс.Метрики"
          ><?php echo esc_textarea($yandex_metric); ?></textarea>
          <p class="description">Вставьте полный код Яндекс.Метрики (с тегами script)</p>
        </td>
      </tr>
    </table>

    <?php submit_button('Сохранить изменения'); ?>
  </form>

</div>

<style>
  .theme-settings .form-table {
    margin-top: 20px;
  }
  .theme-settings .large-text {
    width: 100%;
    max-width: 800px;
  }
  .theme-settings .code {
    font-family: 'Montserrat', monospace;
    font-size: 13px;
  }
</style>