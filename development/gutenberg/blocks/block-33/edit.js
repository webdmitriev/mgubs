import { useState } from '@wordpress/element';
import {
  useBlockProps, RichText,
  InspectorControls, MediaUpload, MediaUploadCheck,
  URLInput
} from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-33.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, descr, buttonText, buttonLink, imageData, imageId } = attributes;

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
            <span className="block-info-title">🎨 Block 33 - Telegram</span>
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
                    <label className="my-rich-text__label">Описание</label>
                    <RichText
                      tagName="div"
                      label="Описание"
                      value={descr}
                      onChange={(value) => setAttributes({ descr: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    />
                  </FlexBlock>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Кнопка - текст</label>
                    <RichText
                      tagName="div"
                      value={buttonText}
                      onChange={(value) => setAttributes({ buttonText: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                  <FlexItem>
                    <label className="my-rich-text__label">Кнопка - ссылка</label>
                    <URLInput
                      value={buttonLink}
                      onChange={(value) => setAttributes({ buttonLink: value })}
                      placeholder={__('URL...', 'theme')}
                    />
                  </FlexItem>
                </Flex>
              </div>

              <Flex>
                <FlexBlock>
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectImage}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div className="advanced-block-image advanced-block-image-100">
                          <div className="label-image">Фоновая картинка</div>
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
