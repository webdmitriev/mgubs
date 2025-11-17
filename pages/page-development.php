<?php
/*
 * Template Name: Development
*/


get_header();

$url = get_template_directory_uri();
$image_base64 = 'data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw==';
?>

<main class="mgu-main">
  <img class="mgu-main__bg" src="<?= $url; ?>/assets/img/mgu-main/mgu-main-1920.jpg" alt="alto" />
  <div class="container df-sp-ce">
    <div class="mgu-main__content">
      <h1 class="h1">Бакалавриат ВШБ МГУ</h1>
      <p class="sub_title">Управление бизнесом и предпринимательство</p>
      <div class="divider"></div>
      <p class="sub_title">4-х годичная программа управленческого образования</p>
      <p class="descr">Направлена на получение студентами общих знаний по бизнесу, управлению, экономике, другим социально-экономическим дисциплинам, освоение навыков управленческой деятельности, выработке у студентов передового взгляда на управленческий процесс и формирование основ поведения, позволяющего добиться успеха в деловых организациях</p>
    </div>
    <div class="wpcf7">
      <h3 class="form-title">Запросить презентацию</h3>
      <div class="form-group form-group-input">
        <span class="form-group_label">Имя</span>
        <input class="form-group_input" type="text" placeholder="Имя" />
        <span class="wpcf7-not-valid-tip">Важно заполнить это поле.</span>
      </div>
      <div class="form-group form-group-input">
        <span class="form-group_label">Фамилия</span>
        <input class="form-group_input" type="text" placeholder="Фамилия" />
        <span class="wpcf7-not-valid-tip">Важно заполнить это поле.</span>
      </div>
      <div class="form-group form-group-input">
        <span class="form-group_label">E-mail</span>
        <input class="form-group_input" type="email" placeholder="E-mail" />
        <span class="wpcf7-not-valid-tip">Важно заполнить это поле.</span>
      </div>
      <div class="form-group form-group-input">
        <span class="form-group_label">Контактный номер</span>
        <input class="form-group_input" type="text" placeholder="Контактный номер" />
        <span class="wpcf7-not-valid-tip">Важно заполнить это поле.</span>
      </div>
      <div class="form-group form-group-checkbox">
        <input type="checkbox" />
        <div class="checkbox"></div>
        <span>Даю разрешение <br/>на обработку данных</span>
      </div>
      <div class="form-group form-group-submit">
        <input type="submit" value="Отправить" />
      </div>
    </div>
  </div>
</main>

<section class="mgu-advantages">
  <div class="container">
    <div class="block-title"><h2 class="h2">Title</h2></div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-1.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-2.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-3.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-4.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-5.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
    <div class="advantages-item">
      <img class="advantages-item__icon" src="<?= $url; ?>/assets/img/mgu-advantages/icon-6.svg" alt="alto" />
      <div class="advantages-item__content"><strong>Learning by doing</strong> <br/>Образовательный процесс построен на использовании активных методов обучения. Данная методика позволяет студентам развивать навыки принятия решений, командной работы, коммуникации и лидерства.</div>
    </div>
  </div>
</section>

<?php
get_footer();