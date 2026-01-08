import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-44', {
  title: 'Pay',
  category: 'content-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Pay',
    },
  },
});

console.log('✅ block-44');