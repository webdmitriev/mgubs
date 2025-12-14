import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import AnchorField from '../../../components/AnchorField.js';

const BgAnchorPanel = ({ attributes, setAttributes }) => {
  const { anchor } = attributes;

  return (
    <PanelBody title={__('Фон и якорь', 'theme')} initialOpen={true}>
      <AnchorField
        value={anchor}
        onChange={(newId) => setAttributes({ anchor: newId })}
      />
    </PanelBody>
  );
};

export default BgAnchorPanel;
