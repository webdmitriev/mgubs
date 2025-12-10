// BgAnchorPanel
import { PanelBody, Button, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import colors from '../../../utils/default-colors.js';
import ColorSelect from '../../../components/ColorSelect';

import AnchorField from '../../../components/AnchorField';

const BgAnchorPanel = ({ attributes, setAttributes }) => {
  const { anchor, bgc } = attributes;

  return (
    <PanelBody title={__('Фон и якорь', 'theme')} initialOpen={false}>
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
