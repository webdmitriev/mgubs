const attributes = {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: '' },

  items: { type: 'array', default: [] },

  authorImageId: { type: 'number', default: 0 },
  authorImageData: { type: 'object', default: {} },
  authorName: { type: 'string', default: '' },
  authorData: { type: 'string', default: '' },

  imageId: { type: 'number', default: 0 },
  imageData: { type: 'object', default: {} },
};

export default attributes;