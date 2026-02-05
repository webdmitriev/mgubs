// edit.js (фрагмент для Tabs Group)
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { activeTab } = attributes;
  const blockProps = useBlockProps();

  const TEMPLATE = [
    ['my-plugin/tab', { title: 'Tab 1' }],
    ['my-plugin/tab', { title: 'Tab 2' }],
  ];

  return (
    <div {...blockProps}>
      <div className="tabs-nav">
        { /* Здесь будет логика рендера кнопок на основе данных дочерних блоков */}
        <button onClick={() => setAttributes({ activeTab: 0 })}>Tab 1</button>
      </div>

      <div className="tabs-content">
        <InnerBlocks
          allowedBlocks={['my-plugin/tab']}
          template={TEMPLATE}
        />
      </div>
    </div>
  );
}