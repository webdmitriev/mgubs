import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-39.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subTitle } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 39 - Главный блок (для страниц)</span>
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
              <div className="advanced-block-text">
                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Заголовок</label>
                    <RichText
                      tagName="div"
                      label="Заголовок"
                      value={title}
                      onChange={(value) => setAttributes({ title: value })}
                      placeholder={__('Заголовок...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Подзаголовок</label>
                    <RichText
                      tagName="div"
                      label="Подзаголовок"
                      value={subTitle}
                      onChange={(value) => setAttributes({ subTitle: value })}
                      placeholder={__('Подзаголовок...', 'theme')}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    />
                  </FlexBlock>
                </Flex>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
