document.addEventListener('DOMContentLoaded', () => {
  const tabBlocks = document.querySelectorAll('.custom-tabs-block');

  tabBlocks.forEach(wrapper => {
    const navContainer = wrapper.querySelector('.tabs-nav-container');
    const panels = wrapper.querySelectorAll('.tab-panel-item');

    // Очищаем навигацию на случай повторного рендера
    navContainer.innerHTML = '';

    panels.forEach((panel, index) => {
      const title = panel.querySelector('.tab-panel-title').innerHTML || `Tab ${index + 1}`;
      const btn = document.createElement('button');
      btn.innerHTML = title;
      btn.classList.add('tab-nav-button');
      if (index === 0) {
        btn.classList.add('is-active');
        panel.classList.add('is-active');
      }

      btn.addEventListener('click', () => {
        // Убираем активный класс у всех
        wrapper.querySelectorAll('.tab-nav-button').forEach(b => b.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));

        // Добавляем текущему
        btn.classList.add('is-active');
        panel.classList.add('is-active');
      });

      navContainer.appendChild(btn);
    });
  });
});