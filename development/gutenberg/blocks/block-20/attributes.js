const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },

  items: {
    type: 'array',
    default: [{
      title: '',
      sum: '',
      content: '',
      isButton: {
        type: 'boolean',
        default: true
      }
    }]
  },

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
  },

  bg991Id: { type: 'number', default: 0 },
  bg991Data: {
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
  },

  bg576Id: { type: 'number', default: 0 },
  bg576Data: {
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
  },
};

export default attributes;