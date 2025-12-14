const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },
  subTitleOne: { type: 'string', default: '' },
  subTitleTwo: { type: 'string', default: '' },
  descr: { type: 'string', default: '' },
  divider: { type: 'boolean', default: false },
  // cf7: { type: 'string', default: '' },
  cf7FormId: {
    type: "string",
    default: ""
  },
  cf7Shortcode: {
    type: "string",
    default: ""
  },

  bg1920Id: { type: 'number', default: 0 },
  bg1920Data: {
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

  bg991Id: { type: 'number', default: 0 },
  bg991Data: {
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

  bg576Id: { type: 'number', default: 0 },
  bg576Data: {
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
