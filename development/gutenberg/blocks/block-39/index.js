import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-39', {
  title: 'Главный блок (для страниц)',
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Главный блок (для страниц)',
    },
  },
});

console.log('✅ block-39');