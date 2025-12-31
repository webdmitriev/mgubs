<?php
/*
 * Template Name: Development
*/


get_header();

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';
the_content();
?>

<div class="block-standard block-30">
  <div class="container"><h2 class="h2">Title</h2></div>
  <div class="container df-sp-fs">
    <div class="content-descr">
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
      <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, fugiat.</div>
    </div>
    <div class="content-images">
      <div class="content-author">
        <img decoding="async" src="https://mgubs.ru/wp-content/uploads/2023/05/different.jpg" alt="MGU" />
        <div class="content-author__data">
          <h3 class="h3">Виханский Олег Самуилович</h3>
          <div class="descr">Декан Высшей школы бизнеса МГУ. <br/>Профессор, доктор экономических наук. <br/>Заслуженный профессор Московского университета. <br/>Заведующий кафедрой менеджмента ВШБ МГУ.</div>
        </div>
      </div>
      <img decoding="async" src="https://mgubs.ru/wp-content/uploads/2024/01/cube-all-1.svg" alt="MGU" />
    </div>
  </div>
</div>

<?php // echo do_shortcode('[contact-form-7 id="d65f8de" title="Контактная форма 1"]'); ?>
<?php // echo do_shortcode('[featured_posts]'); ?>

<?php
get_footer();