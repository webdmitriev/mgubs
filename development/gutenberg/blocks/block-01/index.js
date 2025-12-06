import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-01', {
  title: 'Главный блок',
  category: 'webdmitriev',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Главный блок',
    },
  },
});

console.log('✅ block-01');