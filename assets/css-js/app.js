
/* app.js */
document.addEventListener('DOMContentLoaded', function () {
  console.log('webdmitriev');

  // Находим все honeypot поля
  // console.log('www');
  // const honeypots = document.querySelectorAll('.cf7-honeypot-field');
  // console.log(honeypots);

  // honeypots.forEach(field => {
  //   // Устанавливаем тестовое значение
  //   field.value = "TEST_BOT";

  //   // Логируем в консоль для проверки
  //   console.log("Honeypot field filled for test:", field.name, "value:", field.value);
  // });
})

/* header.js */
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


/* search-form.js */
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  const searchField = document.querySelector(".search-field");
  const ajaxSearch = document.querySelector(".ajax-search");

  let timeout;

  async function performSearch(term) {
    if (term.length < 2) {
      ajaxSearch.innerHTML = "";
      ajaxSearch.classList.remove("active");
      return;
    }

    ajaxSearch.classList.add("active");
    ajaxSearch.innerHTML = `<li class="search-loading">Поиск...</li>`;

    try {
      const response = await fetch(NewsSearchData.ajax_url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "news_search",
          s: term,
          nonce: NewsSearchData.nonce
        })
      });

      const data = await response.json();
      displaySearchResults(data);

    } catch (e) {
      ajaxSearch.innerHTML = `<li class="search-error">Ошибка соединения</li>`;
    }
  }

  function displaySearchResults(res) {
    if (res.success && res.data.length > 0) {
      console.log(res.data);
      ajaxSearch.innerHTML = res.data
        .map(item => `
                    <li class="search-result-item">
                        <a href="${item.link}" class="search-result-link df-sp-st">
                          <img src="${item.thumbnail}" alt="МГУ" />
                          <span class="search-result-title">${item.title}</span>
                        </a>
                    </li>
                `)
        .join("");
    } else {
      ajaxSearch.innerHTML = `<li class="search-no-results">Ничего не найдено</li>`;
    }
  }

  searchField.addEventListener("input", () => {
    const term = searchField.value.trim();
    clearTimeout(timeout);
    timeout = setTimeout(() => performSearch(term), 400);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-form")) {
      ajaxSearch.classList.remove("active");
    }
  });

  searchField.addEventListener("focus", () => {
    if (ajaxSearch.innerHTML.trim() !== "") {
      ajaxSearch.classList.add("active");
    }
  });

  searchForm.addEventListener("submit", (e) => {
    if (ajaxSearch.classList.contains("active")) {
      const first = ajaxSearch.querySelector(".search-result-link");
      if (first) {
        e.preventDefault();
        window.location.href = first.href;
      }
    }
  });
});

