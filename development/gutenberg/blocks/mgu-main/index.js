import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/main-block', {
  title: 'Main block',
  category: 'landing',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Превью заголовка',
      subTitleOne: 'Превью подзаголовка',
    },
  },
});

console.log('✅ Main block');