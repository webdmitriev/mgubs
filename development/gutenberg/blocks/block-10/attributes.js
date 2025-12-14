export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },
  subTitle: { type: 'string', default: '' },

  imageOneId: { type: 'number', default: 0 },
  imageOneData: {
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

  imageTwoId: { type: 'number', default: 0 },
  imageTwoData: {
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

  contacts: {
    type: 'array',
    default: [
      {
        label: '',
        content: '',
      }
    ]
  }
};
