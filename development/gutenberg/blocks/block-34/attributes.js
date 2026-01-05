export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },
  date: { type: 'string', default: '' },
  time: { type: 'string', default: '' },
  buttonText: { type: 'string', default: '' },
  buttonLink: { type: 'string', default: '' },

  second_title: { type: 'string', default: '' },
  description: { type: 'string', default: '' },

  items: { type: 'array', default: [] },

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

  rgba: { type: 'string', default: '' }
};
