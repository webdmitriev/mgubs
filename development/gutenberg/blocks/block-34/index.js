import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-34', {
  title: 'Главный блок (события)',
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Главный блок (события)',
    },
  },
});

console.log('✅ block-34');