import { Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const FieldLabelWithButton = ({ label, onTypograph, hasValue }) => (
  <Flex justify="space-between" align="center">
    <span>{label}</span>
    {hasValue && (
      <Button
        variant="tertiary"
        size="small"
        onClick={onTypograph}
        title={__('Типографировать это поле', 'theme')}
        style={{ minWidth: 'auto', padding: '4px 8px' }}
      >
        🎨
      </Button>
    )}
  </Flex>
);

export default FieldLabelWithButton;
