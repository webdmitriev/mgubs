<?php
/*
 * Template Name: Gutenberg
*/


get_header();
the_content();
?>

<div class="block-standard block-02">
  <div class="container">
    <div class="block-title"><h2 class="h2 underline">Ближайшие события</h2></div>
    <a href="#" class="event-item df-sp-st">
      <div class="event-item__date df-ce-ce">
        <div class="event-item__date-day">27</div>
        <div class="event-item__date-month">ноябрь</div>
        <div class="event-item__date-time">19:00</div>
      </div>
      <div class="event-item__image">
        <p class="event-item__title">Презентация магистерских программ и мастер-классы</p>
        <img src="https://mgubs.ru/wp-content/uploads/2023/08/event-ma.jpg" alt="alto" />
      </div>
      <div class="event-item__content">
        <p class="event-item__title">Презентация магистерских программ и мастер-классы</p>
        <p class="descr">Высшая школа бизнеса МГУ приглашает абитуриентов на презентации программ магистратуры и мастер-классы от бизнес-практиков</p>
        <div class="link">Подробнее</div>
      </div>
    </a>
  </div>
  <div class="btn btn-white">Кнопка</div>
</div>

<?php
get_footer();