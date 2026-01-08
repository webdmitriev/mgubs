const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  shadow: { type: 'string', default: '' },

  video: { type: 'string', default: '' },

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
};

export default attributes;