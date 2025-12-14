const attributes = {
  anchor: { type: 'string', default: '' },

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
      content: '',
      contacts: ''
    }]
  },
};

export default attributes;