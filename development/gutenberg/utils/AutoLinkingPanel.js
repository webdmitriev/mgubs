import { PanelBody, PanelRow, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Компонент панели авто-линкинга для InspectorControls
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onAutoLink - Функция вызываемая при клике
 * @param {number} props.postsCount - Количество доступных постов
 * @param {boolean} props.disabled - Отключена ли кнопка
 */
const AutoLinkingPanel = ({ onAutoLink, postsCount, disabled = false }) => {
  return (
    <PanelBody title={__('Auto Linking', 'theme')} initialOpen={false}>
      <PanelRow>
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: '12px', marginBottom: '12px' }}>
            {__('Automatically link post titles found in content to their respective posts.', 'theme')}
          </p>

          <Button
            variant="secondary"
            onClick={onAutoLink}
            disabled={disabled}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {__('🔗 Auto Link Posts', 'theme')}
          </Button>

          <p style={{ fontSize: '11px', marginTop: '8px', color: '#757575' }}>
            {__('Available posts:', 'theme')} {postsCount}
          </p>
        </div>
      </PanelRow>
    </PanelBody>
  );
};

export default AutoLinkingPanel;