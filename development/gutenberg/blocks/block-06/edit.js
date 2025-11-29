import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subTitle, buttonText, buttonOption } = attributes;

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
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 06</span>
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
                <div className="richtext-to-select">
                  <div className="richtext-to-select__item">
                    <label className="my-rich-text__label">Текст кнопки</label>
                    <RichText
                      tagName="div"
                      value={buttonText}
                      onChange={(value) => setAttributes({ buttonText: value })}
                      placeholder={__('Текст кнопки...', 'theme')}
                      allowedFormats={[]}
                    />
                  </div>
                  <div className="richtext-to-select__item">
                    <label className="my-rich-text__label">Задача кнопки</label>
                    <SelectControl
                      value={buttonOption}
                      options={[
                        { label: 'Вызов popup', value: 'btn-show-popup' },
                        { label: 'Скролл до формы контактов', value: 'contacts-block-id' }
                      ]}
                      onChange={(value) => setAttributes({ buttonOption: value })}
                    />
                  </div>
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
