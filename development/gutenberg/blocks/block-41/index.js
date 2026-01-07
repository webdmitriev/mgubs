import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-41', {
  title: __('Истории успеха', 'theme'),
  category: 'content-blocks',
  icon: 'admin-customizer',
  description: __(' ', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Истории успеха',
    },
  },
});

console.log('✅ block-41');