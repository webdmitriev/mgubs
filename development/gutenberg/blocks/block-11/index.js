import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-11', {
  title: 'Главный блок с формой',
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Главный блок с формой'
    },
  },
});

console.log('✅ block-11');