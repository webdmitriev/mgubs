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