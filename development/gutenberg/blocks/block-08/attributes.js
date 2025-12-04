const attributes = {
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
    default: 'View All Teachers',
  },
  linkURL: {
    type: 'string',
    default: '',
  }
};

export default attributes;