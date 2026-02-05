import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
// import attributes from './attributes';

registerBlockType('my-plugin/tab', {
  title: 'Tab',
  icon: 'layout',
  parent: ['my-plugin/tabs'], // Доступен только внутри Tabs Group
  attributes: {
    title: {
      type: 'string',
      default: 'New Tab',
    },
  },
  edit: edit,
  save: save,
});