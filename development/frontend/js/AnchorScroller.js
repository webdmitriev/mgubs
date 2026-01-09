class AnchorScroller {
  constructor({
    linkClass = 'ancLinks',
    offset = 100,
    duration = 1100
  } = {}) {
    this.linkClass = linkClass;
    this.offset = offset;
    this.duration = duration;

    this.handleClick = this.handleClick.bind(this);
    document.body.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const link = event.target.closest(`.${this.linkClass}`);
    if (!link) return;

    const href = link.getAttribute('href');

    // Проверка безопасности
    if (!href || !href.startsWith('#')) return;

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    event.preventDefault();

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      this.offset;

    this.smoothScrollTo(targetPosition, this.duration);
  }

  smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
