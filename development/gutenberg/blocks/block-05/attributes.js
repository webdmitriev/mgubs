export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  programs: {
    type: 'array',
    default: [
      {
        url: '',
        pageId: 0,
        title: '',
        excerpt: '',
        image: '',
        width: 'w-32',
      }
    ]
  }
};
