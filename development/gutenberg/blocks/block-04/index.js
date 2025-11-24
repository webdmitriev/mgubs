import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-04', {
  title: 'Новости (с настроек)',
  category: 'webdmitriev',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  edit,
  save,
});

console.log('✅ block-04');