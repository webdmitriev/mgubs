import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { activeTab = 0 } = attributes;
  const blockProps = useBlockProps({
    className: 'custom-tabs-block'
  });

  const { insertBlock, removeBlock } = useDispatch('core/block-editor');

  // Получаем данные о дочерних блоках
  const innerBlocks = useSelect(
    (select) => {
      const { getBlock } = select('core/block-editor');
      const block = getBlock(clientId);
      return block ? block.innerBlocks : [];
    },
    [clientId]
  );

  // Состояние для отслеживания изменений
  const [tabsData, setTabsData] = useState([]);

  // Обновляем данные вкладок при изменении innerBlocks
  useEffect(() => {
    const newTabsData = innerBlocks.map((block, index) => ({
      id: block.clientId,
      title: block.attributes?.title || `Вкладка ${index + 1}`,
      index: index,
      isActive: activeTab === index
    }));
    setTabsData(newTabsData);
  }, [innerBlocks, activeTab]);

  // Добавляем новую вкладку
  const addNewTab = () => {
    const newTabIndex = innerBlocks.length;
    const newTabBlock = createBlock('my-plugin/tab', {
      title: `Вкладка ${newTabIndex + 1}`
    });

    insertBlock(newTabBlock, newTabIndex, clientId, false);

    // Устанавливаем новую вкладку как активную
    setTimeout(() => {
      setAttributes({ activeTab: newTabIndex });
    }, 50);
  };

  // Удаляем вкладку
  const deleteTab = (index) => {
    if (innerBlocks.length <= 1 || !innerBlocks[index]) return;

    removeBlock(innerBlocks[index].clientId, false);

    // Обновляем активную вкладку
    if (activeTab === index) {
      const newActiveTab = Math.max(0, index - 1);
      setAttributes({ activeTab: newActiveTab });
    } else if (activeTab > index) {
      setAttributes({ activeTab: activeTab - 1 });
    }
  };

  // Убедимся, что activeTab всегда валидный
  useEffect(() => {
    if (innerBlocks.length > 0 && activeTab >= innerBlocks.length) {
      const newActiveTab = Math.max(0, innerBlocks.length - 1);
      setAttributes({ activeTab: newActiveTab });
    }
  }, [innerBlocks.length, activeTab]);

  return (
    <div {...blockProps}>
      {/* Панель управления */}
      <InspectorControls>
        <PanelBody title="Настройки вкладок" initialOpen={true}>
          <div style={{ marginBottom: '16px' }}>
            <Button
              variant="primary"
              onClick={addNewTab}
              style={{ width: '100%' }}
            >
              Добавить вкладку
            </Button>
          </div>

          {tabsData.length > 0 && (
            <div>
              <strong>Список вкладок ({tabsData.length}):</strong>
              {tabsData.map((tab, index) => (
                <div
                  key={tab.id || index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: tab.isActive ? '#e0f0ff' : '#f0f0f0',
                    borderRadius: '4px',
                    border: tab.isActive ? '1px solid #007cba' : '1px solid transparent'
                  }}
                >
                  <span>{tab.title || `Вкладка ${index + 1}`}</span>
                  {tabsData.length > 1 && (
                    <Button
                      variant="secondary"
                      isDestructive
                      isSmall
                      onClick={() => deleteTab(index)}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </PanelBody>
      </InspectorControls>

      {/* Навигация */}
      <div className="tabs-navigation" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '2px solid #ddd'
      }}>
        {tabsData.map((tab, index) => (
          <button
            key={tab.id || index}
            type="button"
            className={`tab-button ${activeTab === index ? 'is-active' : ''}`}
            onClick={() => {
              setAttributes({ activeTab: index });
            }}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === index ? '#007cba' : '#f0f0f0',
              color: activeTab === index ? 'white' : '#333',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '500',
              minWidth: '100px'
            }}
          >
            {tab.title || `Вкладка ${index + 1}`}
          </button>
        ))}

        <Button
          variant="secondary"
          isSmall
          onClick={addNewTab}
          style={{
            marginLeft: 'auto',
            alignSelf: 'center'
          }}
        >
          + Добавить
        </Button>
      </div>

      {/* Контентная область */}
      <div className="tabs-content-wrapper">
        {/* Важно: InnerBlocks должен быть видим для работы */}
        <InnerBlocks
          allowedBlocks={['my-plugin/tab']}
          templateLock={false}
          renderAppender={false}
        />
      </div>
    </div>
  );
}