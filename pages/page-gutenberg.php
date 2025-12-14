<?php
/*
 * Template Name: Gutenberg
*/

$url = get_template_directory_uri();

get_header();
?><div style="display: block; height: 55px;"></div><?php
the_content();
?>

<div class="block-standard block-20">
  <picture>
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/06/bg-576.11.jpg.webp" type="image/webp" media="(max-width: 576px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/06/bg-576.11.jpg" type="image/jpeg" media="(max-width: 576px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/06/bg-991.11.jpg.webp" type="image/webp" media="(max-width: 991px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/06/bg-991.11.jpg" type="image/jpeg" media="(max-width: 991px)">
    <source srcset="https://mgubs.ru/wp-content/uploads/2023/06/bg-1920.11.jpg.webp" type="image/webp">
    <img decoding="async" class="bg-image" src="https://mgubs.ru/wp-content/uploads/2023/06/bg-1920.11.jpg" alt="MGU" />
  </picture>
  <div class="container">
    <h2 class="h2">Стоимость обучения</h2>
    <div class="content-items df-ce-st">
      <div class="content-item">
        <h4 class="h4">Для российских граждан</h4>
        <div class="content-item__sum">860 000 ₽</div>
        <div class="descr">за академический год <br/>430 000 ₽ – за семестр <br/>(оплата производится по семестрам)</div>
        <button class="btn btn-orange">Оставить заявку</button>
      </div>
      <div class="content-item">
        <h4 class="h4">Для иностранных граждан</h4>
        <div class="content-item__sum">890 000 ₽</div>
        <div class="descr">за академический год <br/>445 000 ₽ – за семестр <br/>(оплата производится по семестрам)</div>
        <button class="btn btn-orange">Оставить заявку</button>
      </div>
    </div>
  </div>
</div>

<div class="block-standard block-21">
  <div class="container accordion-container">
    <div class="panel">
      <div class="panel-heading">При каких симптомах следует пройти эндодонтическое лечение?</div>
      <div class="panel-collapse" style="display: none;"><div class="panel-body descr">Например, если цвет зуба изменился, либо у вас есть какие-либо болевые ощущения или если появилась повышенная чувствительность зубов к теплу или холоду.</div></div>
    </div>
    <div class="panel">
      <div class="panel-heading">
        <span class="heading-title">Насколько болезненно лечение?</span>
      </div>
      <div class="panel-collapse" style="display: none;"><div class="panel-body">Большинство пациентов не испытывают никакой боли во время лечения благодаря анестезии</div></div>
    </div>
    <div class="panel">
      <div class="panel-heading">
        <span class="heading-title">Может ли потребоваться эндодонтические лечение повторно?</span>
      </div>
      <div class="panel-collapse" style="display: none;"><div class="panel-body">Травмы или глубокий вторичный кариес могут быть показанием к повторному эндодонтическому лечению. Однако, такое случается редко</div></div>
    </div>
    <div class="panel">
      <div class="panel-heading">
        <span class="heading-title">Всегда ли врач-эндодонтист может сохранить зуб?</span>
      </div>
      <div class="panel-collapse" style="display: none;"><div class="panel-body"><a href="#">Всё зависит</a> от степени разрушения зуба</div></div>
    </div>
  </div>
</div>

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