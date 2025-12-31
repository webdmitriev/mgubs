import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-30', {
  title: __('Мы другие', 'theme'),
  category: 'content-blocks',
  icon: 'admin-customizer',
  description: __(' ', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Мы другие',
    },
  },
});

console.log('✅ block-30');