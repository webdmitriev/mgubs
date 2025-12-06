import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-07', {
  title: 'О школе',
  category: 'webdmitriev',
  icon: 'admin-customizer',
  description: ' ',
  attributes,
  supports: {
    reusable: true,   // ❗ позволяет сохранять как повторно используемый блок
    multiple: true,   // позволяет вставлять больше одного раза
    inserter: true,   // показывает блок в списке
  },
  edit,
  save,
  example: {
    attributes: {
      title: 'О школе',
    },
  },
});

console.log('✅ block-07');