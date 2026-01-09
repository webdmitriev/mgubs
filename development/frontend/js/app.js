document.addEventListener('DOMContentLoaded', function () {
  console.log('webdmitriev');

  // variables
  const body = document.querySelector('body');
  const contactsBlockId = document.querySelector('#contacts-block-id');
  const overlay = document.querySelector('.overlay');
  const popupCall = document.querySelector('.popup-call');
  const popupVideo = document.querySelector('.popup-video');

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

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

  // ********
  // block-16
  document.querySelectorAll('.block-16-link').forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const item = this.closest('.content-item');
      const descr = item.querySelector('.content-item__descr');

      if (!descr) return;

      const textOpen = this.dataset.rename || 'Свернуть';
      const textClosed = this.dataset.name || 'Подробнее';

      // === ЗАКРЫВАЕМ ===
      if (descr.classList.contains('active')) {
        // плавное закрытие
        descr.style.maxHeight = descr.scrollHeight + 'px';

        setTimeout(() => {
          descr.style.maxHeight = '0';
        }, 10);

        descr.classList.remove('active');
        this.classList.remove('active');

        // меняем текст на "Подробнее"
        this.textContent = textClosed;

        return;
      }

      // === ОТКРЫВАЕМ ===
      descr.classList.add('active');
      this.classList.add('active');

      // подготовка
      descr.style.maxHeight = '0px';

      // плавное открытие
      setTimeout(() => {
        descr.style.maxHeight = descr.scrollHeight + 'px';
      }, 10);

      // меняем текст на "Свернуть"
      this.textContent = textOpen;
    });
  });

  // *********
  // Accordion
  new Accordion('.accordion-container', {
    multiple: false, // только один открыт
    animationTime: 300
  });

  // block-29
  document.querySelectorAll('.block-29').forEach(block => {
    const btn = block.querySelector('.btn');
    const contentButton = block.querySelector('.content-button');
    const contentBlocks = block.querySelectorAll('.content-block');

    if (!btn || !contentButton) {
      console.warn('Отсутствуют обязательные элементы в блоке:', block);
      return;
    }

    if (btn.hasAttribute('data-event-bound')) {
      console.log('Событие уже привязано к кнопке');
      return;
    }

    btn.addEventListener('click', function handleClick() {
      try {
        contentButton.style.display = 'none';

        if (contentBlocks.length > 0) {
          contentBlocks.forEach(el => {
            el.style.display = 'flex';
          });
        } else {
          console.log('Блоки контента не найдены');
        }
      } catch (error) {
        console.error('Ошибка при обработке клика:', error);
      }
    });

    btn.setAttribute('data-event-bound', 'true');
  });

  // ********
  // block-31
  document.querySelectorAll('.block-31').forEach(block => {
    const button = block.querySelector('.show-more');
    if (!button) return;

    button.addEventListener('click', () => {
      block.querySelectorAll('.block-teachers').forEach(el => el.classList.add('active'));
      button.hidden = true;
    });
  });

  // ********
  // block-32
  document.addEventListener('click', function (e) {
    const playButton = e.target.closest('.block-slide__play');
    if (!playButton) return;

    body.classList.add('overflow');
    overlay.classList.add('active');

    const dataVideo = playButton.getAttribute('data-video');
    popupVideo.innerHTML = `<iframe width="840" height="472" src="https://rutube.ru/play/embed/${dataVideo}/" style="border: none;" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`;
    popupVideo.style.display = 'block';
  });


  $(document).on('keydown', function (event) {
    if (event.keyCode === 27) { hideCleanPopup() }
  });

  document.querySelector('.overlay').addEventListener('click', hideCleanPopup)

  function hideCleanPopup() {
    document.querySelector('.popup-video').innerHTML = '';
    document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
    document.querySelector('.overlay').classList.remove('active');
    document.querySelector('body').classList.remove('overflow');
    document.querySelectorAll("[data-popup-form]").forEach(popup => popup.classList.remove('is-active'));
  }

  // block event (start)
  if (document.querySelector('.block-34 [event-time]')) {
    const eventTitle = document.querySelector('.block-34 h1').textContent || 'No title';
    const eventTime = document.querySelector('.block-34 [event-time]').getAttribute('event-time') || '00:01';
    const eventDay = document.querySelector('.block-34 [event-day]').getAttribute('event-day') || '01';
    const eventMonth = document.querySelector('.block-34 [event-month]').getAttribute('event-month') || '1';

    let eventsDataAll = { 'title': eventTitle, 'day': eventDay, 'mounth': months[parseInt(eventMonth) - 1], 'mounthnum': eventMonth, 'time': eventTime }

    localStorage.setItem('eventsData', JSON.stringify(eventsDataAll));
  }

  if (document.querySelector('.block-43') && document.querySelector('.block-43 .content-date')) {
    let eventsDataThanksAll = JSON.parse(localStorage.getItem('eventsData'));
    const title = eventsDataThanksAll["title"].split(' ').join('+');
    const day = eventsDataThanksAll["day"];
    const month = eventsDataThanksAll["mounth"];
    const monthNum = eventsDataThanksAll["mounthnum"];
    const time = eventsDataThanksAll["time"];

    document.querySelector('.block-43 .content-date .block-date__day').textContent = day;
    document.querySelector('.block-43 .content-date .block-date__month').textContent = month;
    document.querySelector('.block-43 .content-date .block-date__time').textContent = time;
    document.querySelector('.block-43 .block-date a').setAttribute('href', `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=2024${monthNum}${day}T${time.substring(0, 2)}0000/2023${monthNum}${day}T235900`);
  }
  // block event (end)

  // ********
  // block-47
  if (document.querySelector('.block-47')) {
    openVideoRutube('.block-47')
  }

  // ******************************* start
  // *************************************
  // block-48 + all buttons + cf7 redirect
  document.querySelectorAll('a.link[href^="#"], a.btn[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');

      if (!hash || hash === '#') return;

      const key = hash.slice(1);
      const popup = document.querySelector(`[data-popup-form="${key}"]`);

      if (!popup) return;

      e.preventDefault();

      popup.classList.add('is-active');
      overlay?.classList.add('active');
      body.classList.add('overflow');
    });
  });

  document.querySelectorAll('.block-close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const popup = btn.closest('[data-popup-form]');
      popup?.classList.remove('is-active');
      overlay.classList.remove('active');
      body.classList.remove('overflow');
    });
  });

  document.addEventListener('wpcf7mailsent', function (event) {
    const form = event.target;
    const popup = form.closest('[data-popup-form]');
    if (!popup) return;

    const redirectUrl = popup.getAttribute('redirect');
    if (!redirectUrl) return;
    window.location.href = redirectUrl;
  });
  // block-48 + all buttons + cf7 redirect
  // *************************************
  // ********************************* end

  // ********
  // block-52
  if (document.querySelector('.block-52')) {
    openVideoRutube('.block-52')
  }

  // ***************
  // Anchor Scroller
  new AnchorScroller({
    linkClass: 'ancLinks',
    offset: 180,
    duration: 1100
  });


  // recaptcha hide (start)
  setInterval(() => { $('.grecaptcha-badge').parent().hide() }, 1200);
  // recaptcha hide (end)

  // Rutube video open function
  function openVideoRutube(el) {
    document.querySelectorAll(el).forEach(block => {
      block.addEventListener('click', function (e) {
        const playButton = e.target.closest('.block-play');
        if (!playButton) return;

        const dataVideo = playButton.dataset.video;
        const iframeContainer = block.querySelector('.block-iframe');

        iframeContainer.classList.add('active');
        iframeContainer.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.width = '840';
        iframe.height = '472';
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;

        iframe.src = `https://rutube.ru/play/embed/${dataVideo}/?autoplay=1&muted=1&controls=1`;

        iframeContainer.appendChild(iframe);
      });
    });
  }

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
