const attributes = {
  selectedTeachers: {
    type: 'array',
    default: [],
  },
  teachersData: {
    type: 'array',
    default: [],
    source: 'query',
    selector: '.teacher-item',
    query: {
      id: {
        type: 'number',
        source: 'attribute',
        attribute: 'data-teacher-id',
      },
      name: {
        type: 'string',
        source: 'html',
        selector: '.teacher-name',
      },
      position: {
        type: 'string',
        source: 'html',
        selector: '.teacher-position',
      },
      description: {
        type: 'string',
        source: 'html',
        selector: '.teacher-description',
      },
      imageUrl: {
        type: 'string',
        source: 'attribute',
        selector: '.teacher-image img',
        attribute: 'src',
      },
      imageId: {
        type: 'number',
        source: 'attribute',
        selector: '.teacher-image img',
        attribute: 'data-image-id',
      },
    },
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