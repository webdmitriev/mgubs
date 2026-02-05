import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title } = attributes;

  const blockProps = useBlockProps.save({
    className: 'tab-panel-item',
    'data-tab-title': title || '' // Заголовок для фронтенд скрипта
  });

  return (
    <div {...blockProps}>
      <div className="tab-panel-content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}