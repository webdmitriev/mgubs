<?php
/*
 * Template Name: Development
*/


get_header();

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';
the_content();
?>

<div class="block-standard block-24">
  <picture>
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/ma-bg-576x.jpg.webp" type="image/webp" media="(max-width: 576px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/ma-bg-576x.jpg" type="image/jpeg" media="(max-width: 576px)">

    <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/bg-ma-991.jpg.webp" type="image/webp" media="(max-width: 991px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/bg-ma-991.jpg" type="image/jpeg" media="(max-width: 991px)">

    <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/bg-ma-1920.jpg.webp" type="image/webp">
    <img decoding="async" class="image-bg" src="https://mgubs.ru/wp-content/uploads/2023/07/bg-ma-1920.jpg" data-src="https://mgubs.ru/wp-content/uploads/2023/07/bg-ma-1920.jpg" alt="MGU">
  </picture>
  <div class="container df-sp-fs">
    <div class="content-title">
      <h1 class="h1">Магистерские программы</h1>
    </div>
    <div class="content-descr with-border">
      <h2 class="h2">Стратегия бизнеса <br/><br/>Управление бизнесом и предпринимательство</h2>
      <div class="descr">Специализированные учебные программы, разработанные для выпускников ВУЗов, имеющих степень бакалавра или диплом специалиста, нацеленных на построение карьеры или развитие собственного бизнеса, мотивированных к серьезной учебе</div>
    </div>
  </div>
</div>

<div class="block-standard block-25">
  <div class="container">
    <div class="block-title" style="margin-bottom: 24px;"><h2 class="h2 underline">Ближайшие события</h2></div>
  </div>
</div>

<div class="block-standard block-26">
  <div class="container">
    <a href="#" class="content-item">
      <div class="content-item__content df-fs-fe">
        <picture>
          <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg.webp" type="image/webp">
          <img decoding="async" class="content-item__image" src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" data-src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" alt="MGU">
        </picture>
        <h4 class="h4 content-item__title">title</h4>
        <div class="descr content-item__descr">www</div>
      </div>
      <div class="descr">Нацелена на изучение подходов и инструментов к стратегированию и принятию управленческих решений менеджментом организаций. Программа формирует компетенции и высокопрофессиональное поведение. Позволяет успешно решать конкретные управленческие задачи на практике.</div>
    </a>
    <a href="#" class="content-item">
      <div class="content-item__content df-fs-fe">
        <picture>
          <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg.webp" type="image/webp">
          <img decoding="async" class="content-item__image" src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" data-src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" alt="MGU">
        </picture>
        <h4 class="h4 content-item__title">title</h4>
        <div class="descr content-item__descr">www</div>
      </div>
      <div class="descr">Нацелена на изучение подходов и инструментов к стратегированию и принятию управленческих решений менеджментом организаций. Программа формирует компетенции и высокопрофессиональное поведение. Позволяет успешно решать конкретные управленческие задачи на практике.</div>
    </a>
    <a href="#" class="content-item">
      <div class="content-item__content df-fs-fe">
        <picture>
          <source srcset="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg.webp" type="image/webp">
          <img decoding="async" class="content-item__image" src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" data-src="https://mgubs.ru/wp-content/uploads/2023/07/ma-strategia-biznesa-585x.jpg" alt="MGU">
        </picture>
        <h4 class="h4 content-item__title">title</h4>
        <div class="descr content-item__descr">www</div>
      </div>
      <div class="descr">Нацелена на изучение подходов и инструментов к стратегированию и принятию управленческих решений менеджментом организаций. Программа формирует компетенции и высокопрофессиональное поведение. Позволяет успешно решать конкретные управленческие задачи на практике.</div>
    </a>
  </div>
</div>


<?php // echo do_shortcode('[contact-form-7 id="d65f8de" title="Контактная форма 1"]'); ?>
<?php // echo do_shortcode('[featured_posts]'); ?>

<?php
get_footer();