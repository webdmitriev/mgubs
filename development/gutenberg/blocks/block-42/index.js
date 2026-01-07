import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-42', {
  title: 'Management',
  category: 'content-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Management',
    },
  },
});

console.log('✅ block-42');