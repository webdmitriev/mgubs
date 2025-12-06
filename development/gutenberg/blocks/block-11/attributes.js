const attributes = {
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

  imageId: { type: 'number', default: 0 },
  imageUrl: { type: 'string', default: '' },
  imageWebp: { type: 'string', default: '' },
  imageAlt: { type: 'string', default: '' },

  responsive: {
    type: "object",
    default: {
      webp: "",
      jpg: "",
      default: "",
      alt: ""
    }
  }
};

export default attributes;
