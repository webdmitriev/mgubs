import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { list as listIcon } from '@wordpress/icons';

// Регистрируем кастомный формат
registerFormatType('theme/list-format', {
  title: 'Список',
  tagName: 'ul',
  className: null,
  edit: ({ isActive, value, onChange }) => {
    return (
      <RichTextToolbarButton
        icon={listIcon}
        title="Список"
        onClick={() => {
          const newValue = toggleFormat(value, {
            type: 'theme/list-format',
            tagName: 'ul',
            className: null,
          });
          onChange(newValue);
        }}
        isActive={isActive}
      />
    );
  },
});
