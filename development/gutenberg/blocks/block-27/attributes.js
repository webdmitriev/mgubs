const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  isStandard: { type: 'boolean', default: false },

  isRevers: { type: 'boolean', default: true },

  isTopTitle: { type: 'boolean', default: false },
  title: { type: 'string', default: '' },
  content: { type: 'string', default: '' },

  imageId: { type: 'number', default: 0 },
  imageData: { type: 'object', default: {} },

  bg1920Id: { type: 'number', default: 0 },
  bg1920Data: {
    type: 'object',
    default: {
      url: '',
      alt: '',
      responsive: {
        webp: '',
        jpg: '',
        default: '',
      }
    }
  }
};

export default attributes;