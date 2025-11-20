
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

