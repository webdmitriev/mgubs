import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType('my-plugin/tabs', {
  title: 'Tabs Group',
  icon: 'index-card',
  category: 'layout',
  attributes,
  // Разрешаем вкладывать только наши блоки-вкладки
  allowedBlocks: ['my-plugin/tab'],
  edit: edit,
  save: save,
});