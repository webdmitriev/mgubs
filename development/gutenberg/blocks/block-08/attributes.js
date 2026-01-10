const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  selectedTeachers: {
    type: 'array',
    default: [],
  },
  isShowMoreButton: {
    type: 'boolean',
    default: false,
  },
  isShowLink: {
    type: 'boolean',
    default: false,
  },
  linkText: {
    type: 'string',
    default: '',
  },
  linkURL: {
    type: 'string',
    default: '',
  }
};

export default attributes;