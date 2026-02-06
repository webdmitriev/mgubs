import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { activeTab = 0 } = attributes;
  const blockProps = useBlockProps({ className: 'custom-tabs-block' });

  // Получаем функции для управления блоками
  const { insertBlock, removeBlock } = useDispatch('core/block-editor');

  // Получаем реальные данные дочерних блоков напрямую из стора
  const innerBlocks = useSelect(
    (select) => select('core/block-editor').getBlock(clientId)?.innerBlocks || [],
    [clientId]
  );

  const addNewTab = () => {
    const newIndex = innerBlocks.length;
    const newTabBlock = createBlock('my-plugin/tab', {
      title: `Вкладка ${newIndex + 1}`
    });
    insertBlock(newTabBlock, newIndex, clientId);
    setAttributes({ activeTab: newIndex });
  };

  const deleteTab = (index, tabClientId) => {
    if (innerBlocks.length <= 1) return;
    removeBlock(tabClientId);

    if (activeTab >= index && activeTab > 0) {
      setAttributes({ activeTab: activeTab - 1 });
    }
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Управление вкладками">
          <Button variant="primary" onClick={addNewTab} isBusy={false} style={{ width: '100%' }}>
            Добавить вкладку
          </Button>
        </PanelBody>
      </InspectorControls>

      {/* Навигация */}
      <div className="tabs-navigation" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {innerBlocks?.map((block, index) => (
          <div key={block.clientId} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setAttributes({ activeTab: index })}
              style={{
                padding: '8px 16px',
                background: activeTab === index ? '#ff762f' : '#f0f0f0',
                color: activeTab === index ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {block.attributes.title || `Вкладка ${index + 1}`}
            </button>
            {innerBlocks.length > 1 && (
              <button
                onClick={() => deleteTab(index, block.clientId)}
                style={{
                  position: 'absolute', top: '-5px', right: '-5px',
                  background: 'red', color: 'white', border: 'none',
                  borderRadius: '50%', width: '15px', height: '15px', fontSize: '10px', lineHeight: '15px'
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Контент */}
      <div className="tabs-content-wrapper">
        <style>
          {`
              .custom-tabs-block .wp-block-my-plugin-tab { display: none !important; }
              .custom-tabs-block .wp-block-my-plugin-tab[data-active="true"] { display: block !important; }
          `}
        </style>
        <InnerBlocks
          allowedBlocks={['my-plugin/tab']}
          renderAppender={false}
        />
      </div>
    </div>
  );
}