class Accordion {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);

    if (!this.container) {
      console.warn(`Accordion: container "${selector}" not found`);
      return;
    }

    this.settings = {
      multiple: false, // позволяет открывать несколько панелей
      animationTime: 300,
      ...options
    };

    this.panels = Array.from(this.container.querySelectorAll('.panel'));

    if (!this.panels.length) {
      console.warn('Accordion: no panels found inside container');
      return;
    }

    this.init();
  }

  init() {
    this.panels.forEach(panel => {
      const heading = panel.querySelector('.panel-heading');
      const collapse = panel.querySelector('.panel-collapse');

      if (!heading || !collapse) return;

      collapse.style.display = 'none';

      heading.addEventListener('click', e => {
        e.preventDefault();
        this.togglePanel(panel);
      });
    });
  }

  togglePanel(panel) {
    const collapse = panel.querySelector('.panel-collapse');
    const heading = panel.querySelector('.panel-heading');

    if (!collapse || !heading) return;

    const isOpen = collapse.style.display === 'block';

    if (isOpen) {
      this.closePanel(panel);
    } else {
      if (!this.settings.multiple) {
        this.closeAllExcept(panel);
      }
      this.openPanel(panel);
    }
  }

  openPanel(panel) {
    const collapse = panel.querySelector('.panel-collapse');
    const heading = panel.querySelector('.panel-heading');
    if (!collapse) return;

    heading.classList.add('in');

    collapse.style.display = 'block';
    collapse.style.height = '0px';
    collapse.offsetHeight; // reflow

    collapse.style.transition = `height ${this.settings.animationTime}ms ease`;
    collapse.style.height = collapse.scrollHeight + 'px';

    setTimeout(() => {
      collapse.style.height = 'auto';
    }, this.settings.animationTime);
  }

  closePanel(panel) {
    const collapse = panel.querySelector('.panel-collapse');
    const heading = panel.querySelector('.panel-heading');

    if (!collapse) return;

    heading.classList.remove('in');

    collapse.style.height = collapse.scrollHeight + 'px';
    collapse.offsetHeight; // reflow

    collapse.style.transition = `height ${this.settings.animationTime}ms ease`;
    collapse.style.height = '0px';

    setTimeout(() => {
      collapse.style.display = 'none';
    }, this.settings.animationTime);
  }

  closeAllExcept(activePanel) {
    this.panels.forEach(panel => {
      if (panel !== activePanel) {
        this.closePanel(panel);
      }
    });
  }
}
