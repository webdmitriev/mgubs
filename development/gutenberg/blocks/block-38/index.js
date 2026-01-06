import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-38', {
  title: 'Контакты с картинками',
  category: 'contacts-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Контакты с картинками',
    },
  },
});

console.log('✅ block-38');