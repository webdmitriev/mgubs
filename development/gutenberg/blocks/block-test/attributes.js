const attributes = {
  selectedTeachers: {
    type: 'array',
    default: [],
  },
  columns: {
    type: 'number',
    default: 3,
  },
  showImage: {
    type: 'boolean',
    default: true,
  },
  showPosition: {
    type: 'boolean',
    default: true,
  },
  showDescription: {
    type: 'boolean',
    default: true,
  },
};

export default attributes;