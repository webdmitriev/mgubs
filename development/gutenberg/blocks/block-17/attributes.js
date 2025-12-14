const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  items: {
    type: 'array',
    default: [{
      image: {
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
    }]
  },
};

export default attributes;