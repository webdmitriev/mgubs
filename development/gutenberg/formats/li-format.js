const { registerFormatType, toggleFormat, getActiveFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { createElement } = wp.element;

registerFormatType('theme/li-format', {
  title: 'Custom List Item',
  tagName: 'span',
  className: 'custom-list',
  edit({ isActive, value, onChange }) {
    return createElement(RichTextToolbarButton, {
      icon: 'editor-ul',
      title: 'Псевдо-элемент списка',
      onClick: () => {
        // Проверяем, есть ли уже формат
        const active = getActiveFormat(value, 'theme/li-format');

        if (active) {
          // Если есть — удаляем
          onChange(toggleFormat(value, { type: 'theme/li-format' }));
        } else {
          // Если нет — добавляем
          onChange(toggleFormat(value, { type: 'theme/li-format' }));
        }

        // Дополнительно очищаем пустые span вручную
        const content = value;
        const html = wp.richText.serialize(content);
        const cleanedHtml = html.replace(/<span class="custom-list"><\/span>/g, '');
        onChange(wp.richText.deserialize(cleanedHtml));
      },
      isActive,
    });
  },
});
