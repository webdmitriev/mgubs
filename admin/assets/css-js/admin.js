jQuery(document).ready(function ($) {
  var frame;

  $('#upload_logo_button').on('click', function (e) {
    e.preventDefault();

    if (frame) { frame.open(); return; }

    frame = wp.media({
      title: 'Выберите логотип',
      button: { text: 'Использовать' },
      multiple: false
    });

    frame.on('select', function () {
      var attachment = frame.state().get('selection').first().toJSON();
      $('#site_logo').val(attachment.id); // сохраняем ID
      $('#logo_preview').attr('src', attachment.url).show(); // обновляем превью
    });

    frame.open();
  });

  $('#remove_logo_button').on('click', function () {
    $('#site_logo').val('');
    $('#logo_preview').hide().attr('src', '');
  });
});