const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  isRevers: { type: 'boolean', default: true },

  isTopTitle: { type: 'boolean', default: false },
  title: { type: 'string', default: '' },
  content: { type: 'string', default: '' },

  imageId: { type: 'number', default: 0 },
  imageData: { type: 'object', default: {} }
};

export default attributes;