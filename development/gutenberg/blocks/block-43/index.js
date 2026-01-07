import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-43', {
  title: 'Главный блок (с датой события)',
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Главный блок (с датой события)',
    },
  },
});

console.log('✅ block-43');