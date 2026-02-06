import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { title } = attributes;

  // Определяем, является ли эта вкладка активной, глядя на родителя
  const isActive = useSelect((select) => {
    const { getBlockRootClientId, getBlockAttributes, getBlockIndex } = select('core/block-editor');
    const rootId = getBlockRootClientId(clientId);
    if (!rootId) return false;

    const parentAttributes = getBlockAttributes(rootId);
    const myIndex = getBlockIndex(clientId, rootId);
    return parentAttributes?.activeTab === myIndex;
  }, [clientId]);

  const blockProps = useBlockProps({
    className: 'tab-panel-item',
    'data-active': isActive ? 'true' : 'false', // Для CSS родителя
    style: {
      padding: '20px',
      border: '1px solid #ddd',
      background: '#fff',
      display: isActive ? 'block' : 'none' // Дополнительная страховка
    }
  });

  const innerBlocksProps = useInnerBlocksProps(
    { className: 'tab-content' },
    { template: [['core/paragraph', { placeholder: 'Контент вкладки...' }]] }
  );

  return (
    <div {...blockProps}>
      <div style={{ borderBottom: '1px solid #eee', marginBottom: '15px' }}>
        <div style={{ marginBottom: 4, color: 'gray' }}>Название вкладки:</div>
        <RichText
          tagName="div"
          className="tab-title"
          value={title}
          onChange={(val) => setAttributes({ title: val })}
          placeholder="Заголовок вкладки..."
        />
      </div>
      <div {...innerBlocksProps} />
    </div>
  );
}