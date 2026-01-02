import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import attributes from './attributes';

registerBlockType('theme/block-31', {
  title: __('Преподаватели (иерархия)', 'theme'),
  description: __('', 'theme'),
  icon: 'groups',
  category: 'pages-blocks',
  attributes,
  edit: Edit,
  save: Save,
  supports: {
    html: false,
    align: true,
  },
  example: {
    attributes: {
      title: 'Преподаватели (иерархия)',
    },
  },
});

console.log('✅ block-31');