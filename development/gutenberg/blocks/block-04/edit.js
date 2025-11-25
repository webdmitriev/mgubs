import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  URLInput,
  InspectorControls
} from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { buttonText, buttonLink } = attributes;

  const [isPreview, setIsPreview] = useState(true);

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
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 04</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <div>Картинка</div>
          )}

          {isPreview && (
            <div className="advanced-block-content">
              <div className="advanced-block-buttons">
                <div className="advanced-block-button">
                  <label className="my-rich-text__label">Кнопка - текст</label>
                  <RichText
                    tagName="div"
                    value={buttonText}
                    onChange={(value) => setAttributes({ buttonText: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </div>

                <div className="advanced-block-button">
                  <label className="my-rich-text__label">Кнопка - ссылка</label>
                  <URLInput
                    value={buttonLink}
                    onChange={(value) => setAttributes({ buttonLink: value })}
                    placeholder={__('Введите название страницы или url', 'theme')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
