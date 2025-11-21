import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, second_title, description, imageUrl, imageId, bgUrl, bgId } = attributes;

  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  // Handler - image
  const onSelectImage = (media) => {
    setAttributes({
      imageUrl: media.url,
      imageId: media.id,
    });
  };

  const onRemoveImage = () => {
    setAttributes({ imageUrl: '', imageId: 0 });
  };

  // Handler - bg
  const onSelectBg = (media) => {
    setAttributes({
      bgUrl: media.url,
      bgId: media.id,
    });
  };

  const onRemoveBg = () => {
    setAttributes({ bgUrl: '', bgId: 0 });
  };

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 01</span>
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
                  <label htmlFor="rich-title" className="my-rich-text__label">Заголовок</label>
                  <RichText
                    id="rich-title"
                    tagName="div"
                    label="Заголовок"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>

                <>
                  <label htmlFor="rich-second_title" className="my-rich-text__label">Второй заголовок</label>
                  <RichText
                    id="rich-second_title"
                    tagName="div"
                    value={second_title}
                    onChange={(value) => setAttributes({ second_title: value })}
                    placeholder={__('Второй заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>

                <>
                  <label htmlFor="rich-description" className="my-rich-text__label">Описание</label>
                  <RichText
                    id="rich-description"
                    tagName="div"
                    value={description}
                    onChange={(value) => setAttributes({ description: value })}
                    placeholder={__('Описание...', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  />
                </>

              </div>

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectImage}
                  allowedTypes={['image']}
                  value={imageId}
                  render={({ open }) => (
                    <div className="advanced-block-image advanced-block-image-48">
                      <div className="label-image">Картинка (куб)</div>
                      {imageUrl ? (
                        <>
                          <img
                            src={imageUrl}
                            className="advanced-image-preview"
                            alt=""
                            style={{ borderRadius: '8px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <Button onClick={open} variant="secondary" size="small">
                              ✏️ {__('Изменить', 'theme')}
                            </Button>
                            <Button
                              onClick={onRemoveImage}
                              variant="tertiary"
                              size="small"
                              isDestructive
                            >
                              🗑 {__('Удалить', 'theme')}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button onClick={open} variant="primary">
                          📷 {__('Добавить картинку', 'theme')}
                        </Button>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectBg}
                  allowedTypes={['image']}
                  value={bgId}
                  render={({ open }) => (
                    <div className="advanced-block-image advanced-block-image-48">
                      <div className="label-image">Картинка (фон)</div>
                      {bgUrl ? (
                        <>
                          <img
                            src={bgUrl}
                            className="advanced-image-preview"
                            alt=""
                            style={{ borderRadius: '8px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <Button onClick={open} variant="secondary" size="small">
                              ✏️ {__('Изменить', 'theme')}
                            </Button>
                            <Button
                              onClick={onRemoveBg}
                              variant="tertiary"
                              size="small"
                              isDestructive
                            >
                              🗑 {__('Удалить', 'theme')}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button onClick={open} variant="primary">
                          📷 {__('Добавить картинку', 'theme')}
                        </Button>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
