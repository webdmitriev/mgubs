const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  items: {
    type: 'array',
    default: [{
      title: '',
      content: ''
    }]
  },
};

export default attributes;