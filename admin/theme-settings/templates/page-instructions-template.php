<?php
// admin/theme-settings/templates/page-instructions-template.php
if (!defined('ABSPATH')) exit;

// Пути к видео файлам
$videos = array(
  'main' => array(
    'title' => 'Главное видео',
    'path' => get_template_directory_uri() . '/admin/instructions/main-video-01.mov',
    'preview' => get_template_directory_uri() . '/admin/instructions/main-video-01-preview.jpg',
    'description' => 'Полное видео по работе с настройками и блоками'
  )
);
?>

<div class="wrap theme-instructions">
  <h1>🎬 Видео инструкции</h1>

  <p>Добро пожаловать в раздел видео-инструкций. Здесь вы найдете полезные руководства по использованию различных функций / блоков сайта.</p>

  <div class="video-grid" style="display: grid; grid-template-columns: repeat(auto-fit, 400px); gap: 20px; margin-top: 30px;">
    <?php foreach ($videos as $key => $video): ?>
      <div class="video-card" style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px;">
        <h3 style="margin-top: 0; color: #2271b1;"><?php echo esc_html($video['title']); ?></h3>

        <div class="video-player" style="margin: 15px 0;">
          <video controls style="width: 100%; max-width: 100%;height: inherit;aspect-ratio: 16 / 9; border-radius: 4px;" poster="<?php echo esc_url($video['preview']); ?>">
            <source src="<?php echo esc_url($video['path']); ?>" type="video/mp4">
            <source src="<?php echo esc_url($video['path']); ?>" type="video/quicktime">
            Your browser does not support the video tag.
          </video>
        </div>

        <p class="video-description" style="color: #666; font-size: 14px; line-height: 1.4;"><?php echo esc_html($video['description']); ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<style>
  .theme-instructions-wrap {
    max-width: 1400px;
  }

  .instructions-intro {
    background: #f0f6ff;
    border-left: 4px solid #2271b1;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 4px;
  }

  .video-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .video-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }

  .video-player video:focus {
    outline: 2px solid #2271b1;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .video-grid {
      grid-template-columns: 1fr !important;
    }
  }
</style>
