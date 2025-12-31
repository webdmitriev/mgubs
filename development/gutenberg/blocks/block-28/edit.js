import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, FlexItem, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-28.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, label, content, imageId, imageData } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Handler - image
  const onSelectImage = (media) => {
    setAttributes({
      imageId: media.id,
      imageData: {
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

  const onRemoveImage = () => {
    setAttributes({
      imageId: 0,
      imageData: {
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

  const blockProps = useBlockProps({
    className: 'block-style block-style-27'
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
            <span className="block-info-title">🎨 Block 28 - История школы</span>
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
              <Flex>
                <FlexBlock>
                  <label className="my-rich-text__label">Заголовок</label>
                  <RichText
                    tagName="div"
                    label="Заголовок"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
              </Flex>
              <div className="my-block-content-image">
                <div className="my-block-content">
                  <>
                    <label className="my-rich-text__label">Лейбл</label>
                    <RichText
                      tagName="div"
                      label="Лейбл"
                      value={label}
                      onChange={(value) => setAttributes({ label: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </>
                  <>
                    <label className="my-rich-text__label">Описание</label>
                    <RichText
                      tagName="div"
                      label="Описание"
                      value={content}
                      onChange={(value) => setAttributes({ content: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </>
                </div>
                <div className="my-block-image">
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectImage}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div className="advanced-block-image advanced-block-image-100">
                          <div className="label-image">Картинка</div>
                          {imageData.url ? (
                            <>
                              <img
                                src={imageData.url}
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