import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import colors from '../../../utils/default-colors.js';
import ColorSelect from '../../../components/ColorSelect.js';

import AnchorField from '../../../components/AnchorField.js';

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
