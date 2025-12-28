export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },
  subTitle: { type: 'string', default: '' },

  buttonText: { type: 'string', default: '' },
  buttonLink: { type: 'string', default: '' },

  isBlockLine: { type: 'boolean', default: true },

  second_title: { type: 'string', default: '' },

  description: {
    type: 'string',
    default: '',
  },

  imageId: { type: 'number', default: 0 },
  imageData: {
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
