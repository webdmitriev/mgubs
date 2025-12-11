class GalleryPopup {
  constructor(options = {}) {
    this.settings = {
      triggerSelector: '.show-popup-gallery', // Кликабельные элементы
      imageSelector: 'img',                   // Селектор картинок внутри родителя
      parentSelector: null,                   // Автоматическое определение родителя
      popupClass: 'gallery-popup',
      ...options
    };

    this.popup = null;
    this.currentGallery = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.createPopup();
    this.setupEventListeners();
  }

  createPopup() {
    // Создаем popup элемент (остается таким же)
    this.popup = document.createElement('div');
    this.popup.className = this.settings.popupClass;
    this.popup.innerHTML = `
      <div class="gallery-overlay"></div>
      <div class="gallery-container">
        <button class="gallery-close">&times;</button>
        <button class="gallery-prev">‹</button>
        <div class="gallery-content">
          <img class="gallery-image" src="" alt="">
          <div class="gallery-loader">
            <div class="loader-spinner"></div>
          </div>
        </div>
        <button class="gallery-next">›</button>
        <div class="gallery-thumbnails"></div>
        <div class="gallery-counter">
          <span class="current-index">1</span> / <span class="total-count">0</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.popup);

    // Назначаем обработчики для popup
    this.popup.querySelector('.gallery-overlay').addEventListener('click', () => this.close());
    this.popup.querySelector('.gallery-close').addEventListener('click', () => this.close());
    this.popup.querySelector('.gallery-prev').addEventListener('click', () => this.prev());
    this.popup.querySelector('.gallery-next').addEventListener('click', () => this.next());

    // Закрытие по ESC и управление стрелками
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  setupEventListeners() {
    // Обработчик клика на триггерные элементы
    document.addEventListener('click', (e) => {
      const target = e.target.closest(this.settings.triggerSelector);
      if (target) {
        e.preventDefault();
        this.openFromTrigger(target);
      }
    });
  }

  openFromTrigger(triggerElement) {
    // Находим родительский контейнер
    let parent;

    if (this.settings.parentSelector) {
      // Если указан конкретный родитель
      parent = triggerElement.closest(this.settings.parentSelector);
    } else {
      // Автоматически ищем общего родителя для всех картинок
      parent = this.findCommonParent(triggerElement);
    }

    if (!parent) {
      console.warn('Parent container not found');
      return;
    }

    // Находим все картинки внутри родителя
    const images = parent.querySelectorAll(this.settings.imageSelector);

    if (images.length === 0) {
      console.warn('No images found in parent container');
      return;
    }

    // Преобразуем в массив и находим индекс кликнутой картинки
    const imagesArray = Array.from(images);
    const clickedImage = triggerElement.matches('img') ?
      triggerElement :
      triggerElement.querySelector('img');

    const clickedIndex = clickedImage ?
      imagesArray.indexOf(clickedImage) :
      0;

    // Открываем галерею
    this.openGallery(imagesArray, Math.max(0, clickedIndex));
  }

  findCommonParent(triggerElement) {
    // Ищем родительский контейнер, который содержит все картинки с таким же триггером
    let currentParent = triggerElement.parentElement;

    while (currentParent && currentParent !== document.body) {
      // Проверяем, содержит ли этот родитель другие триггеры
      const otherTriggers = currentParent.querySelectorAll(this.settings.triggerSelector);
      if (otherTriggers.length > 1) {
        return currentParent;
      }
      currentParent = currentParent.parentElement;
    }

    // Если не нашли общего родителя, используем непосредственного родителя
    return triggerElement.parentElement;
  }

  openGallery(images, startIndex = 0) {
    this.currentGallery = images;
    this.currentIndex = startIndex;

    this.updatePopupContent();
    this.showPopup();
  }

  updatePopupContent() {
    const imageElement = this.popup.querySelector('.gallery-image');
    const thumbnailsContainer = this.popup.querySelector('.gallery-thumbnails');
    const counterElement = this.popup.querySelector('.gallery-counter');
    const currentIndexElement = this.popup.querySelector('.current-index');
    const totalCountElement = this.popup.querySelector('.total-count');
    const loader = this.popup.querySelector('.gallery-loader');

    // Показываем лоадер
    loader.classList.add('active');
    imageElement.classList.remove('loaded');

    // Обновляем основное изображение
    const currentImage = this.currentGallery[this.currentIndex];

    const img = new Image();
    img.onload = () => {
      imageElement.src = currentImage.src;
      imageElement.alt = currentImage.alt || '';
      imageElement.classList.add('loaded');
      loader.classList.remove('active');
    };
    img.onerror = () => {
      imageElement.alt = 'Image failed to load';
      loader.classList.remove('active');
    };
    img.src = currentImage.src;

    // Обновляем счетчик
    currentIndexElement.textContent = this.currentIndex + 1;
    totalCountElement.textContent = this.currentGallery.length;

    // Обновляем миниатюры
    thumbnailsContainer.innerHTML = '';
    this.currentGallery.forEach((image, index) => {
      const thumb = document.createElement('img');
      thumb.src = image.src;
      thumb.alt = image.alt || '';
      thumb.className = `gallery-thumb ${index === this.currentIndex ? 'active' : ''}`;
      thumb.addEventListener('click', () => this.goTo(index));
      thumbnailsContainer.appendChild(thumb);
    });

    // Показываем/скрываем кнопки навигации
    this.updateNavigation();
  }

  updateNavigation() {
    const prevBtn = this.popup.querySelector('.gallery-prev');
    const nextBtn = this.popup.querySelector('.gallery-next');

    if (this.currentGallery.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }
  }

  next() {
    if (this.currentGallery.length <= 1) return;

    this.currentIndex = (this.currentIndex + 1) % this.currentGallery.length;
    this.updatePopupContent();
  }

  prev() {
    if (this.currentGallery.length <= 1) return;

    this.currentIndex = (this.currentIndex - 1 + this.currentGallery.length) % this.currentGallery.length;
    this.updatePopupContent();
  }

  goTo(index) {
    if (index >= 0 && index < this.currentGallery.length) {
      this.currentIndex = index;
      this.updatePopupContent();
    }
  }

  showPopup() {
    this.popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.popup.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
      this.currentGallery = [];
      this.currentIndex = 0;
    }, 300);
  }

  destroy() {
    if (this.popup) {
      this.popup.remove();
    }
  }
}