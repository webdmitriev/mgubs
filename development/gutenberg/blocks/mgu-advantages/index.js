import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('theme/mgu-advantages', {
  title: __('Преимущества', 'theme'),
  category: 'landing',
  icon: 'admin-customizer',
  description: __('Блок с повторяющимися элементами', 'theme'),
  attributes,
  edit,
  save,
  example: {
    attributes: {
      title: 'Преимущества',
      subTitleOne: 'Преимущества',
    },
  },
});

console.log('✅ Advantages block');