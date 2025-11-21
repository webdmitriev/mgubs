export default {
  title: {
    type: 'string',
    default: 'Высшая школа бизнеса МГУ',
  },

  isBlockLine: {
    type: 'boolean',
    default: true
  },

  second_title: {
    type: 'string',
    default: 'Миссия школы',
  },

  description: {
    type: 'string',
    default: 'Готовим будущих лидеров, провайдеров изменений, способных отвечать на вызовы современного бизнеса. Широко мыслящих, включенных в мировую бизнес среду. Ответственных перед обществом, создающих ценность для него.',
  },

  imageId: { type: 'number', default: 0 },
  imageData: {
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
