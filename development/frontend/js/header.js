document.addEventListener('DOMContentLoaded', function () {

  const body = document.querySelector('body');
  const closePopup = document.querySelectorAll('.close-popup');
  const popups = document.querySelectorAll('.popup');
  const overlay = document.querySelector('.overlay');

  const header = document.querySelector('.header');
  const burger = header.querySelector('.burger');
  const headerPopup = document.querySelector('.header-popup');

  const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');

  // Закрытие попапов
  closePopup?.forEach(btn => btn?.addEventListener('click', closeAllPopups));
  overlay?.addEventListener('click', closeAllPopups);
  burger?.addEventListener('click', headerPopupOpen);

  // Попап: поиск и переключение темы
  headerPopup?.addEventListener('click', (e) => {
    const mobileSearchIcon = e.target.closest('.mobile-search-icon');
    const eyeBtn = e.target.closest('.eye');

    if (mobileSearchIcon) {
      const contentTop = mobileSearchIcon.closest('.header-popup__content-top');
      const searchForm = contentTop?.querySelector('.search-form');
      searchForm?.classList.toggle('active');
    }

    if (eyeBtn) {
      const isDark = document.documentElement.classList.toggle('theme-dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  });

  function closeAllPopups() {
    body?.classList.remove('overflow');
    headerPopup?.classList.remove('active');
    overlay?.classList.remove('active');
    popups?.forEach(popup => popup?.classList.remove('active'));
  }

  function headerPopupOpen() {
    body?.classList.add('overflow');
    overlay?.classList.add('active');
    headerPopup?.classList.add('active');
  }

  // Функция закрытия всех подменю
  function closeAllSubMenus() {
    menuItemsWithChildren?.forEach(menuItem => {
      menuItem.classList.remove('active');
      const subMenu = menuItem.querySelector('.sub-menu');
      subMenu?.classList.remove('active');
    });
  }

  // Аккордеон меню
  menuItemsWithChildren?.forEach(menuItem => {
    const menuLink = menuItem.querySelector('a');
    const subMenu = menuItem.querySelector('.sub-menu');
    if (!menuLink || !subMenu) return;

    menuLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Закрываем другие открытые подменю
      if (!menuItem.classList.contains('active')) {
        closeAllSubMenus();
      }

      // Переключаем текущее меню
      menuItem.classList.toggle('active');
      subMenu.classList.toggle('active');
    });
  });

  // Закрытие подменю при клике вне меню
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-item-has-children')) {
      closeAllSubMenus();
    }
  });
});
