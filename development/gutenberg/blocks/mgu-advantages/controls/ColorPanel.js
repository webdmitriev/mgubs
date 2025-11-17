import { PanelBody, ColorPicker, Button, Popover, Flex, FlexItem } from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import colors from '../../../utils/default-colors.js';

const ColorPanel = ({ attributes, setAttributes }) => {
  const { underlineColor, bgc } = attributes;
  const [activePicker, setActivePicker] = useState(null);

  const ColorControl = ({ label, colorValue, colorKey, defaultLabel }) => (
    <div>
      <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '5px' }}>
        {label}
      </div>

      <Flex align="center" gap="8px">
        <Button
          variant="secondary"
          onClick={() => setActivePicker(activePicker === colorKey ? null : colorKey)}
          style={{
            width: '100%',
            height: '26px',
            backgroundColor: colorValue || '#ffffff',
            border: '1px solid #ccc',
            borderRadius: '3px',
            position: 'relative',
            backgroundImage: !colorValue ?
              'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)' : 'none',
            backgroundSize: '6px 6px',
            backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px'
          }}
          title={colorValue || defaultLabel}
        />

        <Flex gap="3px" wrap>
          {colors.slice(0, 8).map((color, index) => (
            <Button
              key={index}
              onClick={() => setAttributes({ [colorKey]: color })}
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: color,
                border: colorValue === color ? '2px solid #007cba' : '1px solid #ddd',
                borderRadius: '2px',
                minWidth: '18px',
                padding: 0
              }}
            />
          ))}
        </Flex>

        {colorValue && (
          <Button
            variant="tertiary"
            onClick={() => setAttributes({ [colorKey]: '' })}
            style={{ width: '18px', height: '18px', minWidth: '18px', padding: 0, fontSize: '10px' }}
            title={__('Сбросить', 'theme')}
          >
            ×
          </Button>
        )}
      </Flex>

      {activePicker === colorKey && (
        <Popover position="bottom left" onClose={() => setActivePicker(null)}>
          <div style={{ padding: '10px' }}>
            <ColorPicker
              color={colorValue}
              onChange={(value) => setAttributes({ [colorKey]: value })}
            />
          </div>
        </Popover>
      )}
    </div>
  );

  return (
    <PanelBody title={__('Цвета', 'theme')} initialOpen={false}>
      <Flex direction="column" gap="12px">
        <PanelColorSettings
          title={__('Подчеркивание заголовка', 'theme')}
          colorSettings={[
            {
              value: underlineColor,
              onChange: (color) => setAttributes({ underlineColor: color }),
              label: __('Background Color', 'theme'),
              colors: colors,
            },
          ]}
        />

        <PanelColorSettings
          title={__('Фон', 'theme')}
          colorSettings={[
            {
              value: bgc,
              onChange: (color) => setAttributes({ bgc: color }),
              label: __('Background Color', 'theme'),
              colors: colors,
            },
          ]}
        />
      </Flex>
    </PanelBody>
  );
};

export default ColorPanel;