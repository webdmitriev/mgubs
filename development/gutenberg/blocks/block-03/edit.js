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
  const { title, bgData, bgId } = attributes;

  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  // Handler - bg
  const onSelectBg = (media) => {
    setAttributes({
      bgId: media.id,
      bgData: {
        url: media.url,
        alt: media.alt || '',
        responsive: media.responsive || {
          webp: '',
          jpg: '',
          default: media.url,
        }
      }
    });
  };

  const onRemoveBg = () => {
    setAttributes({
      bgId: 0,
      bgData: {
        url: '',
        alt: '',
        responsive: {
          webp: '',
          jpg: '',
          default: '',
        }
      }
    });
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
            <span className="block-info-title">🎨 Block 03</span>
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
              </div>

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectBg}
                  allowedTypes={['image']}
                  value={bgId}
                  render={({ open }) => (
                    <div className="advanced-block-image advanced-block-image-48">
                      <div className="label-image">Картинка (фон)</div>
                      {bgData.url ? (
                        <>
                          <img
                            src={bgData.url}
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
