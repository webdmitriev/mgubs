// attributes.js
export const tabsAttributes = {
  activeTab: {
    type: 'number',
    default: 0,
  },
  tabCount: { // Для контроля количества при тестах
    type: 'number',
    default: 1,
  }
};

export const tabAttributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: '.tab-title',
    default: 'Tab Title',
  },
};