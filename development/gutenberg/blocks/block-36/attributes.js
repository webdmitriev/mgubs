export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  blockIconId: { type: 'number', default: 0 },
  blockIconData: {
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
  blockTitle: { type: 'string', default: '' },
  blockItems: { type: 'array', default: [] },
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
  },

  itemsData: { type: 'array', default: [] },
  itemsNumbers: { type: 'array', default: [] },

  bottomTitle: { type: 'string', default: '' },
  bottomDescr: { type: 'string', default: '' },
};
