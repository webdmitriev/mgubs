import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import AnchorField from '../../../components/AnchorField.js';

import colors from '../../../utils/default-colors.js';
import ColorSelect from '../../../components/ColorSelect.js';

const BgAnchorPanel = ({ attributes, setAttributes }) => {
  const { anchor, bgc } = attributes;

  return (
    <PanelBody title={__('Фон и якорь', 'theme')} initialOpen={true}>
      <AnchorField
        value={anchor}
        onChange={(newId) => setAttributes({ anchor: newId })}
      />
      <ColorSelect
        label="Цвет фона"
        colors={[...colors]}
        value={bgc}
        onChange={(val) => setAttributes({ bgc: val })}
      />
    </PanelBody>
  );
};

export default BgAnchorPanel;
