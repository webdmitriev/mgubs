import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import Save from './save';
import attributes from './attributes';

registerBlockType('theme/block-09', {
  title: __('Курсы', 'textdomain'),
  description: __('', 'textdomain'),
  icon: 'groups',
  category: 'widgets',
  attributes,
  edit: Edit,
  save: Save,
  supports: {
    html: false,
    align: true,
  },
});

console.log('✅ block-09');