import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-36', {
  title: 'Контакты с картой',
  category: 'contacts-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Контакты с картой',
    },
  },
});

console.log('✅ block-36');