import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-24', {
  title: __('Заглавный блок', 'theme'),
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: __(' ', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Заглавный блок',
    },
  },
});

console.log('✅ block-24');