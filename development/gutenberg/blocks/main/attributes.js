export default {
  title: {
    type: 'string',
    default: 'NZ OVERSEAS',
  },
  subTitle: {
    type: 'string',
    default: '',
  },
  imageUrl: { type: 'string', default: '' },
  imageId: { type: 'number', default: 0 },
  items: {
    type: 'array',
    default: [{
      content: ''
    }]
  },
};
