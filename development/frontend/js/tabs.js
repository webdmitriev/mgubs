// Если нужно динамическое переключение на фронтенде
document.addEventListener('DOMContentLoaded', function () {
  const tabBlocks = document.querySelectorAll('.custom-tabs-block');

  tabBlocks.forEach(block => {
    const buttons = block.querySelectorAll('.tab-button');
    const tabs = block.querySelectorAll('.tab-panel-item');

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        buttons.forEach(btn => btn.classList.remove('is-active'));
        // Добавляем активный класс текущей кнопке
        button.classList.add('is-active');

        // Скрываем все вкладки
        tabs.forEach(tab => tab.style.display = 'none');
        // Показываем нужную вкладку
        if (tabs[index]) {
          tabs[index].style.display = 'block';
        }

        // Обновляем data-атрибут
        block.setAttribute('data-active-tab', index);
      });
    });
  });
});