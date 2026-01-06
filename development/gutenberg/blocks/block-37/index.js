import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-37', {
  title: 'Контакты с текстом',
  category: 'contacts-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Контакты с текстом',
    },
  },
});

console.log('✅ block-37');