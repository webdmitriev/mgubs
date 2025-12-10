import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-14', {
  title: __('Кого мы ждем', 'theme'),
  category: 'main-blocks',
  icon: 'admin-customizer',
  description: __(' ', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Кого мы ждем',
    },
  },
});

console.log('✅ block-14');