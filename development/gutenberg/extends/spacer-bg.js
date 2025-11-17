import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PanelColorSettings, InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import colors from '../utils/default-colors.js';

// === 1. Добавляем новое свойство в блок ===
addFilter(
  'blocks.registerBlockType',
  'theme/extend-spacer-bg',
  (settings, name) => {
    if (name !== 'core/spacer') {
      return settings;
    }

    // добавляем атрибут backgroundColor
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        backgroundColor: {
          type: 'string',
          default: '',
        },
      },
    };
  }
);

// === 2. Добавляем панель выбора цвета ===
const withBackgroundColorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (props.name !== 'core/spacer') return <BlockEdit {...props} />;

    const { attributes, setAttributes, className } = props;
    const { backgroundColor } = attributes;

    // новый стиль для визуализации цвета прямо в редакторе
    const blockStyle = backgroundColor
      ? { backgroundColor }
      : {};

    return (
      <>
        {/* Панель настроек справа */}
        <InspectorControls>
          <PanelColorSettings
            title={__('Background Color', 'theme')}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (color) => setAttributes({ backgroundColor: color }),
                label: __('Background Color', 'theme'),
                colors: colors,
              },
            ]}
          />
        </InspectorControls>

        {/* Блок с визуальным фоном */}
        <div className={className} style={blockStyle}>
          <BlockEdit {...props} />
        </div>
      </>
    );
  };
}, 'withBackgroundColorControl');
addFilter('editor.BlockEdit', 'theme/with-background-color-control', withBackgroundColorControl);


// === 3. Добавляем inline-стиль при сохранении ===
const addBackgroundColorExtraProps = (saveElementProps, blockType, attributes) => {
  if (blockType.name === 'core/spacer' && attributes.backgroundColor) {
    saveElementProps.style = {
      ...saveElementProps.style,
      backgroundColor: attributes.backgroundColor,
    };
  }
  return saveElementProps;
};

addFilter(
  'blocks.getSaveContent.extraProps',
  'theme/add-background-color-extra-props',
  addBackgroundColorExtraProps
);
