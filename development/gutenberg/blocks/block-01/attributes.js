export default {
  anchor: { type: 'string', default: '' },
  bgc: { type: 'string', default: '' },

  title: { type: 'string', default: 'Высшая школа бизнеса МГУ' },

  isBlockLine: { type: 'boolean', default: true },

  second_title: { type: 'string', default: 'Миссия школы' },

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

  bg1920Id: { type: 'number', default: 0 },
  bg1920Data: {
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

  bg991Id: { type: 'number', default: 0 },
  bg991Data: {
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

  bg576Id: { type: 'number', default: 0 },
  bg576Data: {
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
