export default {
  title: {
    type: 'string',
    default: '',
  },

  bgId: { type: 'number', default: 0 },
  bgData: {
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
