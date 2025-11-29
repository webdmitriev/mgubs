export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },
  title: { type: 'string', default: '' },
  descr: { type: 'string', default: '' },
  buttonText: { type: 'string', default: '' },
  buttonLink: { type: 'string', default: '' },

  widgetTitle: { type: 'string', default: '' },
  widgetSocials: {
    type: 'array',
    default: []
  },
  widgetImageId: { type: 'number', default: 0 },
  widgetImageData: {
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

  posts: {
    type: 'array',
    default: []
  },
};
