// Тестируем:
// 1. Правильно ли сохраняются данные вкладок
// 2. Сохраняется ли активная вкладка
// 3. Корректно ли рендерятся вложенные блоки
// 4. Сохраняются ли стили и классы

import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function Save({ attributes }) {
  const {
    tabs,
    activeTab,
    blockId,
    tabAlignment,
    tabStyle,
    tabBackgroundColor,
    tabTextColor,
    activeTabBackgroundColor,
    activeTabTextColor
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `gutenberg-tabs-block ${tabStyle}`,
    id: blockId,
  });

  // Стили для вкладок
  const tabStyles = {
    '--tabs-alignment': tabAlignment,
    '--tab-bg-color': tabBackgroundColor,
    '--tab-text-color': tabTextColor,
    '--active-tab-bg-color': activeTabBackgroundColor,
    '--active-tab-text-color': activeTabTextColor,
  };

  return (
    <div {...blockProps} style={tabStyles}>
      <div className="gutenberg-tabs-wrapper">
        <div className="gutenberg-tabs-header">
          <div className="gutenberg-tabs-tabs-list" role="tablist">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`gutenberg-tabs-tab-title ${activeTab === index ? 'is-active' : ''}`}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`${blockId}-tab-${index}`}
                id={`${blockId}-tab-${index}-title`}
                data-tab-index={index}
              >
                {tab.title || __('New Tab', 'gutenberg-tabs')}
              </button>
            ))}
          </div>
        </div>

        <div className="gutenberg-tabs-content">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              id={`${blockId}-tab-${index}`}
              className={`gutenberg-tabs-pane ${activeTab === index ? 'is-active' : ''}`}
              role="tabpanel"
              aria-labelledby={`${blockId}-tab-${index}-title`}
              style={{ display: activeTab === index ? 'block' : 'none' }}
            >
              <InnerBlocks.Content />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}