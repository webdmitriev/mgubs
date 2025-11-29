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