import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import Save from './save';
import attributes from './attributes';

registerBlockType('theme/block-08', {
  title: __('Преподаватели', 'theme'),
  description: __('', 'theme'),
  icon: 'groups',
  category: 'widgets',
  attributes,
  edit: Edit,
  save: Save,
  supports: {
    html: false,
    align: true,
  },
  example: {
    attributes: {
      title: 'Преподаватели',
    },
  },
});

console.log('✅ block-08');