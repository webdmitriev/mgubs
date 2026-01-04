export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },
  descr: { type: 'string', default: '' },

  buttonText: { type: 'string', default: '' },
  buttonLink: { type: 'string', default: '' },

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
  }
};
