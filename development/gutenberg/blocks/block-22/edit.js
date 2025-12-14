import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Flex, FlexBlock, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-22.jpg';

import CF7FormSelector from '../../components/CF7FormSelector';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { isBigForm } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const blockProps = useBlockProps({
    className: 'block-style mgu-advantages'
  });

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 22 - Контактная форма</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <img src={blockImage} alt="MGUBS" style={{ width: '100%', height: 'inherit', objectFit: 'contain' }} />
          )}

          {isPreview && (
            <div className="advanced-block-content">
              <>
                <label htmlFor="rich-title" className="my-rich-text__label">Ширина для формы</label>
                <ToggleControl
                  label={isBigForm ? __('Маленькая форма 🤏', 'theme') : __('Большая форма 💪', 'theme')}
                  checked={isBigForm}
                  onChange={(value) => setAttributes({ isBigForm: value })}
                />
              </>
              <Flex direction={[
                'column',
                'row'
              ]}>
                <FlexBlock>
                  <CF7FormSelector attributes={attributes} setAttributes={setAttributes} />
                </FlexBlock>
              </Flex>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;