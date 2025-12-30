import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/block-27', {
  title: __('Текст и картинка', 'theme'),
  category: 'content-blocks',
  icon: 'admin-customizer',
  description: __(' ', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Текст и картинка',
    },
  },
});

console.log('✅ block-27');