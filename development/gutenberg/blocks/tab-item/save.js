import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title } = attributes;

  // Оставляем только <br> теги, остальные удаляем
  const sanitizeTitle = (html) => {
    if (!html) return '';
    // Сохраняем <br>, удаляем всё остальное
    return html
      .replace(/<(?!br\s*\/?)[^>]+>/gi, '') // Удаляем все теги кроме <br>
      .replace(/<br\s*\/?>/gi, '<br />'); // Нормализуем <br> теги
  };

  const blockProps = useBlockProps.save({
    className: 'tab-panel-item'
  });

  return (
    <div {...blockProps}>
      <div
        className="tab-panel-title"
        dangerouslySetInnerHTML={{
          __html: sanitizeTitle(title)
        }}
      />
      <div className="tab-panel-content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}