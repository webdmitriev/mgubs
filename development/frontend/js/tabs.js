document.addEventListener('DOMContentLoaded', () => {
  const tabBlocks = document.querySelectorAll('.custom-tabs-block');

  // Создаем массив промисов для каждого блока
  const promises = Array.from(tabBlocks).map(wrapper => {
    return new Promise(resolve => {
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
          wrapper.querySelectorAll('.tab-nav-button').forEach(b => b.classList.remove('is-active'));
          panels.forEach(p => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          panel.classList.add('is-active');
        });

        navContainer.appendChild(btn);
      });

      // Разрешаем промис после обработки блока
      resolve();
    });
  });

  // Ждем выполнения всех промисов
  Promise.all(promises).then(() => {
    addingArrow();
  });

  function addingArrow() {
    // Получаем все контейнеры с табами
    const tabBlocks = document.querySelectorAll('.wp-block-my-plugin-tabs');

    tabBlocks.forEach(block => {
      const navContainer = block.querySelector('.tabs-nav-container');
      const tabs = block.querySelectorAll('.tab-nav-button');
      const tabsWrapper = document.createElement('div');

      // Оборачиваем кнопки в дополнительный wrapper для скролла
      tabsWrapper.classList.add('tabs-nav-wrapper');

      // Перемещаем все кнопки в новый wrapper
      while (navContainer.firstChild) {
        tabsWrapper.appendChild(navContainer.firstChild);
      }
      navContainer.appendChild(tabsWrapper);

      // Проверяем, нужно ли добавлять стрелки
      const checkAndUpdateArrows = () => {
        const containerWidth = navContainer.offsetWidth;
        const tabsWidth = tabsWrapper.scrollWidth;

        // Удаляем существующие стрелки, если они есть
        const existingPrev = navContainer.querySelector('.tab-arrow-prev');
        const existingNext = navContainer.querySelector('.tab-arrow-next');
        if (existingPrev) existingPrev.remove();
        if (existingNext) existingNext.remove();

        // Убираем классы для скролла
        navContainer.classList.remove('has-scroll', 'scroll-start', 'scroll-end');

        // Если табы шире контейнера - добавляем стрелки
        if (tabsWidth > containerWidth) {
          navContainer.classList.add('has-scroll');

          // Создаем стрелки
          const arrowPrev = document.createElement('button');
          arrowPrev.classList.add('tab-arrow-prev');
          arrowPrev.innerHTML = '‹'; // или можно использовать иконку
          arrowPrev.setAttribute('aria-label', 'Previous tabs');

          const arrowNext = document.createElement('button');
          arrowNext.classList.add('tab-arrow-next');
          arrowNext.innerHTML = '›'; // или можно использовать иконку
          arrowNext.setAttribute('aria-label', 'Next tabs');

          // Добавляем стрелки в контейнер
          navContainer.insertBefore(arrowPrev, navContainer.firstChild);
          navContainer.appendChild(arrowNext);

          // Проверяем положение скролла
          const checkScrollPosition = () => {
            const scrollLeft = tabsWrapper.scrollLeft;
            const maxScroll = tabsWrapper.scrollWidth - tabsWrapper.clientWidth;

            if (scrollLeft <= 0) {
              navContainer.classList.add('scroll-start');
              navContainer.classList.remove('scroll-end');
            } else if (scrollLeft >= maxScroll) {
              navContainer.classList.remove('scroll-start');
              navContainer.classList.add('scroll-end');
            } else {
              navContainer.classList.remove('scroll-start', 'scroll-end');
            }
          };

          // Функции для скролла
          const scrollAmount = 200; // Можно настроить

          const scrollPrev = () => {
            tabsWrapper.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
            });
          };

          const scrollNext = () => {
            tabsWrapper.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          };

          // Добавляем обработчики
          arrowPrev.addEventListener('click', scrollPrev);
          arrowNext.addEventListener('click', scrollNext);

          // Отслеживаем скролл
          tabsWrapper.addEventListener('scroll', checkScrollPosition);

          // Проверяем начальную позицию
          setTimeout(checkScrollPosition, 50); // Небольшая задержка для корректного расчета

          // Добавляем обработчик изменения размера окна
          const resizeHandler = () => {
            const newContainerWidth = navContainer.offsetWidth;
            const newTabsWidth = tabsWrapper.scrollWidth;

            if (newTabsWidth <= newContainerWidth) {
              // Если табы помещаются - удаляем стрелки
              arrowPrev.remove();
              arrowNext.remove();
              navContainer.classList.remove('has-scroll', 'scroll-start', 'scroll-end');
            } else {
              // Иначе обновляем позицию
              checkScrollPosition();
            }
          };

          window.addEventListener('resize', resizeHandler);

          // Очищаем обработчик resize при удалении стрелок
          const cleanup = () => {
            window.removeEventListener('resize', resizeHandler);
          };

          arrowPrev.addEventListener('remove', cleanup);
          arrowNext.addEventListener('remove', cleanup);
        }
      };

      // Выполняем проверку
      checkAndUpdateArrows();

      // Добавляем небольшую задержку для первого рендера
      setTimeout(checkAndUpdateArrows, 100);

      // Добавляем наблюдатель за изменением размера контейнера
      const resizeObserver = new ResizeObserver(() => {
        checkAndUpdateArrows();
      });

      resizeObserver.observe(navContainer);
    });
  }
});