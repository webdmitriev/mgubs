import { PanelBody, Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useTypograf } from '../../../utils/useTypograf';

const ContentPanel = ({ attributes, setAttributes }) => {
  const { title, items } = attributes;

  // Подключаем общий хук с указанием полей для типографирования
  const { typographField, typographAllFields } = useTypograf(attributes, setAttributes, [
    'title',
    'items[].content' // Указываем, что нужно типографировать поле content в каждом item
  ]);

  // Проверяем наличие текста для типографирования
  const hasTextToTypograph = title || items.some(item => item.content && item.content.trim() !== '');

  return (
    <PanelBody title={__('Типограф', 'theme')} initialOpen={false}>
      {hasTextToTypograph && (
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f6f7f7', borderRadius: '4px' }}>
          <Flex direction="column" gap="10px">
            <Button
              variant="primary"
              onClick={typographAllFields}
              style={{ display: 'block', width: '100%', textAlign: 'center' }}
            >
              {__('Типографировать все поля', 'theme')}
            </Button>
            <div style={{ fontSize: '12px', color: '#757575', textAlign: 'center' }}>
              {__('Расставит кавычки, тире и неразрывные пробелы', 'theme')}
            </div>
          </Flex>
        </div>
      )}

      {/* Если хук не поддерживает вложенные поля, добавляем кастомную кнопку */}
      {!hasTextToTypograph && (
        <div style={{ padding: '10px', textAlign: 'center', color: '#757575' }}>
          {__('Нет текста для типографирования', 'theme')}
        </div>
      )}
    </PanelBody>
  );
};

export default ContentPanel;