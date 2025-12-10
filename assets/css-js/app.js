
/* app.js */
document.addEventListener('DOMContentLoaded', function () {
  console.log('webdmitriev');

  // variables
  const body = document.querySelector('body');
  const contactsBlockId = document.querySelector('#contacts-block-id');
  const popupCall = document.querySelector('.popup-call');

  body.addEventListener('click', function (e) {
    if (e.target.classList.contains('contacts-block-id')) {
      e.preventDefault();

      if (contactsBlockId && isElementVisible(contactsBlockId)) {
        smoothScrollTo(contactsBlockId, 1100, 50);
      } else {
        popupCall.style.display = 'flex';
      }
    }
  });

  // Функция проверки видимости элемента
  function isElementVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  // Функция плавной прокрутки
  function smoothScrollTo(element, duration, offset = 0) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // scrolling

  $('body').on('click', ".btn-show-popup", () => $(".popup-call").fadeIn(300))

  // **********
  // AutoSlider
  document.querySelectorAll('.block-14-slider-items-js')?.forEach(slider => {
    new AutoSlider(slider, {
      loop: true,
      autoScrollDelay: 4000,
      slideWidth: 250,
      gap: 16,
      pauseOnHover: true
    });
  });

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

/* autoSlider.js */
class AutoSlider {
  constructor(container, options = {}) {
    // container может быть селектором или DOM-элементом
    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      console.warn(`Slider container not found`);
      return;
    }

    this.settings = {
      slideSelector: '.slide',
      autoScrollDelay: 3000,
      slideWidth: 390,
      gap: 16,
      pauseOnHover: true,
      loop: true,
      ...options
    };

    this.slides = this.container.querySelectorAll(this.settings.slideSelector);
    this.currentIndex = 0;
    this.isScrolling = true;
    this.scrollInterval = null;
    this.slideWidth = this.settings.slideWidth + this.settings.gap;

    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;

    this.startAutoScroll();
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.settings.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
      this.container.addEventListener('mouseleave', () => this.startAutoScroll());
      this.container.addEventListener('touchstart', () => this.stopAutoScroll());
      this.container.addEventListener('touchend', () => this.startAutoScroll());
    }

    this.container.addEventListener('scroll', () => {
      this.handleManualScroll();
    });
  }

  handleManualScroll() {
    const scrollLeft = this.container.scrollLeft;
    this.currentIndex = Math.round(scrollLeft / this.slideWidth);

    // Если зацикливание отключено, останавливаемся в конце
    if (!this.settings.loop && this.currentIndex >= this.slides.length - 1) {
      this.stopAutoScroll();
    }
  }

  scrollToSlide(index) {
    let targetIndex;

    if (this.settings.loop) {
      // Зацикленный режим
      targetIndex = index % this.slides.length;
      if (targetIndex < 0) {
        targetIndex = this.slides.length + targetIndex;
      }
    } else {
      // Режим без зацикливания - ограничиваем индексы
      targetIndex = Math.max(0, Math.min(index, this.slides.length - 1));
    }

    this.currentIndex = targetIndex;

    this.container.scrollTo({
      left: targetIndex * this.slideWidth,
      behavior: 'smooth'
    });

    // Если достигли конца и зацикливание отключено - останавливаем автопрокрутку
    if (!this.settings.loop && targetIndex >= this.slides.length - 1) {
      this.stopAutoScroll();
    }
  }

  nextSlide() {
    const nextIndex = this.currentIndex + 1;

    // Проверяем, достигли ли мы конца при отключенном зацикливании
    if (!this.settings.loop && nextIndex >= this.slides.length) {
      return false; // Не можем двигаться дальше
    }

    this.scrollToSlide(nextIndex);
    return true;
  }

  prevSlide() {
    const prevIndex = this.currentIndex - 1;

    // Проверяем, достигли ли мы начала при отключенном зацикливании
    if (!this.settings.loop && prevIndex < 0) {
      return false; // Не можем двигаться назад
    }

    this.scrollToSlide(prevIndex);
    return true;
  }

  startAutoScroll() {
    // Если зацикливание отключено и мы в конце - не запускаем автопрокрутку
    if (!this.settings.loop && this.currentIndex >= this.slides.length - 1) {
      return;
    }

    this.stopAutoScroll();
    this.isScrolling = true;

    this.scrollInterval = setInterval(() => {
      if (this.isScrolling) {
        const canScroll = this.nextSlide();

        // Если не можем прокрутить дальше (конец без зацикливания) - останавливаем
        if (!canScroll && !this.settings.loop) {
          this.stopAutoScroll();
        }
      }
    }, this.settings.autoScrollDelay);
  }

  stopAutoScroll() {
    this.isScrolling = false;
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  // Публичные методы
  play() {
    this.startAutoScroll();
  }

  pause() {
    this.stopAutoScroll();
  }

  goTo(index) {
    this.scrollToSlide(index);
  }

  // Новый метод для изменения настроек на лету
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };

    // Перезапускаем автопрокрутку если нужно
    if (this.scrollInterval) {
      this.startAutoScroll();
    }
  }

  destroy() {
    this.stopAutoScroll();
  }
}

/* breadcrumbs.js */
document.addEventListener('DOMContentLoaded', function () {
  const breadcrumbs = document.querySelector('.block-12');

  if (!breadcrumbs) return;
  const breadcrumbsPrev = breadcrumbs.querySelector('.breadcrumbs-prev');
  const breadcrumbsNext = breadcrumbs.querySelector('.breadcrumbs-next');
  const breadcrumbsMain = breadcrumbs.querySelector('.breadcrumbs');
  const breadcrumbsMainItems = breadcrumbsMain.querySelectorAll('.breadcrumb');
  let breadcrumbsWidth = 0;
  for (let i = 0; i < breadcrumbsMainItems.length; i++) { const marginRigthElement = getComputedStyle(breadcrumbsMainItems[i]); breadcrumbsWidth += (breadcrumbsMainItems[i].offsetWidth + parseInt(marginRigthElement.marginRight)); }
  if (breadcrumbsWidth > (breadcrumbsMain.offsetWidth - 30)) { breadcrumbsMain.classList.add('breadcrumbs-width') }
  else { breadcrumbsPrev.style.display = 'none'; breadcrumbsNext.style.display = 'none'; }

  breadcrumbsPrev.addEventListener('click', function () { breadcrumbsMain.scrollBy({ left: -300, behavior: 'smooth' }); })
  breadcrumbsNext.addEventListener('click', function () { breadcrumbsMain.scrollBy({ left: 300, behavior: 'smooth' }); })


  window.addEventListener('scroll', function () {
    if (breadcrumbs) {
      const prevSectionTop = breadcrumbs.previousElementSibling.getBoundingClientRect().top;
      const prevSectionHeight = breadcrumbs.previousElementSibling.clientHeight;

      if ((prevSectionTop + prevSectionHeight) < -40) { breadcrumbs.classList.add('breadcrumbs-fixed-anim'); }
      else { breadcrumbs.classList.remove('breadcrumbs-fixed-anim'); }

      if ((prevSectionTop + prevSectionHeight) < -240) { breadcrumbs.classList.add('breadcrumbs-fixed'); }
      else { breadcrumbs.classList.remove('breadcrumbs-fixed'); }
    }
  });
});

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

