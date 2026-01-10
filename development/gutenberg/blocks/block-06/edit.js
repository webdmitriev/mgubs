import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import { ToggleControl, Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-06.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subTitle, buttonText, buttonLink } = attributes;

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
            <span className="block-info-title">🎨 Block 06 - Блок для вызова формы</span>
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
                <>
                  <label className="my-rich-text__label">Заголовок</label>
                  <RichText
                    tagName="div"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
                <>
                  <label className="my-rich-text__label">Подзаголовок</label>
                  <RichText
                    tagName="div"
                    value={subTitle}
                    onChange={(value) => setAttributes({ subTitle: value })}
                    placeholder={__('Подзаголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Текст кнопки:</label>
                    <RichText
                      tagName="div"
                      value={buttonText}
                      onChange={(value) => setAttributes({ buttonText: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                  <FlexBlock className="advanced-block-button">
                    <label className="my-rich-text__label">Кнопка - ссылка</label>
                    <URLInput
                      value={buttonLink}
                      onChange={(value) => setAttributes({ buttonLink: value })}
                      placeholder={__('Введите название страницы или url', 'theme')}
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
