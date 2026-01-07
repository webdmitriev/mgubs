import { PanelBody, Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useTypograf } from '../../../utils/useTypograf';

const ContentPanel = ({ attributes, setAttributes }) => {
  const { title, items } = attributes;

  const { typographField, typographAllFields } = useTypograf(attributes, setAttributes, [
    'title',
    'items[].title',
    'items[].descr',
  ]);

  const hasTextToTypograph = title || items.some(item => item.title && item.title.trim() !== '') || items.some(item => item.descr && item.descr.trim() !== '');

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
    </PanelBody>
  );
};

export default ContentPanel;
