document.addEventListener('DOMContentLoaded', function () {

  $('body').on('click', '.close-popup', function () {
    $('body').removeClass('overflow')

    $('.overlay').removeClass('active')
    $('.header-popup').removeClass('active')
  })

  $(".header").on("click", ".burger", function () {
    $('body').addClass('overflow')
    $('.overlay').addClass('active')
    $('.header-popup').addClass('active')
  })

  $('.header-popup').on('click', '.mobile-search-icon', function () {
    $(this).parents('.header-popup__content-top').find('.search-form').toggleClass('active')
  })

  $('.header-popup').on('click', '.eye', function () {
    const isDark = document.documentElement.classList.toggle('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


  const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');

  menuItemsWithChildren.forEach(menuItem => {
    const menuLink = menuItem.querySelector('a');
    const subMenu = menuItem.querySelector('.sub-menu');

    menuLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Закрываем другие открытые меню (аккордеон поведение)
      if (!menuItem.classList.contains('active')) {
        menuItemsWithChildren.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.sub-menu').classList.remove('active');
        });
      }

      // Переключаем текущее меню
      menuItem.classList.toggle('active');
      subMenu.classList.toggle('active');
    });
  });

  // Закрытие меню при клике вне его (опционально)
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-item-has-children')) {
      menuItemsWithChildren.forEach(menuItem => {
        menuItem.classList.remove('active');
        menuItem.querySelector('.sub-menu').classList.remove('active');
      });
    }
  });
});