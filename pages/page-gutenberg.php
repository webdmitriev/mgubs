<?php
/*
 * Template Name: Gutenberg
*/

$url = get_template_directory_uri();

get_header();
?><div style="display: block; height: 55px;"></div><?php
the_content();
?>

<div class="block-standard block-22">
  <div class="container form-small">
    <?php echo do_shortcode('[contact-form-7 id="8ff0401" title="Форма для подвала"]'); ?>
  </div>
</div>

<div class="block-standard block-23">
  <div class="container content-items">
    <div class="content-item df-fs-fs">
      <img decoding="async" class="img" src="https://mgubs.ru/wp-content/uploads/2024/01/mary_nekericheva_small.jpg" alt="MGU" />
      <div class="descr content-item__head">
        <strong>Некеричева Мария</strong> <br/>Инспектор программы Бакалавр
      </div>
      <div class="descr content-item__contacts df-fs-fs">
        <a href="tel:+74959392592">+7 (495) 939 25 92</a> <br/>
        <a href="mailto:nekericheva@edu.mgubs.ru">nekericheva@edu.mgubs.ru</a>
      </div>
    </div>
    <div class="content-item df-fs-fs">
      <img decoding="async" class="img" src="https://mgubs.ru/wp-content/uploads/2024/01/mary_nekericheva_small.jpg" alt="MGU" />
      <div class="descr content-item__head">
        <strong>Некеричева Мария</strong> <br/>Инспектор программы Бакалавр
      </div>
      <div class="descr content-item__contacts df-fs-fs">
        <a href="tel:+74959392592">+7 (495) 939 25 92</a> <br/>
        <a href="mailto:nekericheva@edu.mgubs.ru">nekericheva@edu.mgubs.ru</a>
        <a href="mailto:nekericheva@edu.mgubs.ru">nekericheva@edu.mgubs.ru</a>
      </div>
    </div>
  </div>
</div>

<div style="display: block; height: 200vh;"></div>

<?php
get_footer();