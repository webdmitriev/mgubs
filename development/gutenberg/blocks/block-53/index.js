// index.js
registerBlockType('my-plugin/tabs', {
  title: 'Tabs Group',
  icon: 'index-card',
  category: 'layout',
  // Разрешаем вкладывать только наши блоки-вкладки
  allowedBlocks: ['my-plugin/tab'],
  edit: Edit,
  save: Save,
});

registerBlockType('my-plugin/tab', {
  title: 'Tab',
  icon: 'layout',
  parent: ['my-plugin/tabs'], // Доступен только внутри Tabs Group
  attributes: {
    title: {
      type: 'string',
      default: 'New Tab',
    },
  },
  edit: TabEdit,
  save: TabSave,
});