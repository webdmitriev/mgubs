const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { createElement } = wp.element;

registerFormatType('theme/li-format', {
  title: 'Custom List Item',
  tagName: 'span',
  className: 'custom-list',
  edit({ isActive, value, onChange }) {
    return createElement(
      RichTextToolbarButton,
      {
        icon: 'editor-ul', // или свой svg
        title: 'Псевдо-элемент списка',
        onClick: () => {
          onChange(
            toggleFormat(value, {
              type: 'theme/li-format',
            })
          );
        },
        isActive,
      }
    );
  },
});
