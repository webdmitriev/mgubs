const attributes = {
  title: { type: 'string', default: '' },
  underlineColor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },
  items: {
    type: 'array',
    default: [{
      imageURL: '',
      imageID: 0,
      content: ''
    }]
  },
};

export default attributes;