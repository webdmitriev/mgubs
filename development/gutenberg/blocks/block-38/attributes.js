export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  titleOne: { type: 'string', default: '' },
  titleTwo: { type: 'string', default: '' },

  oneImageId: { type: 'number', default: 0 },
  oneImageData: {
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

  twoImageId: { type: 'number', default: 0 },
  twoImageData: {
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
