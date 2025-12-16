import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-06', {
  title: 'Блок для вызова формы',
  category: 'contact-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Блок для вызова формы',
    },
  },
});

console.log('✅ block-06');