import { PanelBody, Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useTypograf } from '../../../utils/useTypograf';

const ContentPanel = ({ attributes, setAttributes }) => {
  const { title, second_title, description, imageUrl, imageId, bgUrl, bgId } = attributes;

  const { typographField, typographAllFields } = useTypograf(attributes, setAttributes, [
    'title',
    'second_title',
    'description'
  ]);

  const hasTextToTypograph = title || second_title || description;

  return (
    <PanelBody title={__('Типограф', 'theme')} initialOpen={true}>
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
