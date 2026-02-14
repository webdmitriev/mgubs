import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
  // Мы не деструктурируем activeTab, чтобы не привязывать к нему HTML
  const blockProps = useBlockProps.save({
    className: 'custom-tabs-block'
  });

  return (
    <div {...blockProps}>
      {/* Контейнер для кнопок, которые создаст JS */}
      <div className="tabs-nav-container"></div>

      <div className="tabs-content-container">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}