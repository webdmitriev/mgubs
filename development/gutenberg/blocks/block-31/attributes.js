const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  teacherName: { type: 'string', default: '' },
  teacherPosition: { type: 'string', default: '' },
  teacherDescr: { type: 'string', default: '' },
  teacherImageId: { type: 'number', default: 0 },
  teacherImageData: { type: 'object', default: {} },

  teachers: {
    type: 'array',
    default: [],
    items: {
      type: 'object',
      properties: {
        selectedIds: {
          type: 'array',
          default: [],
        },
      },
    },
  },
};

export default attributes;