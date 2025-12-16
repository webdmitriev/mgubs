import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-04', {
  title: 'Новости (с настроек)',
  category: 'pages-blocks',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Новости (с настроек)',
    },
  },
});

console.log('✅ block-04');