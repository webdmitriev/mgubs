import { useState } from '@wordpress/element';
import {
  useBlockProps, RichText,
  InspectorControls, MediaUpload, MediaUploadCheck,
  URLInput
} from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-38.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    titleOne, titleTwo,
    oneImageId, oneImageData, twoImageId, twoImageData
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Handler - oneImage
  const oneOnSelectImage = (media) => {
    setAttributes({
      oneImageId: media.id,
      oneImageData: {
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

  const oneOnRemoveImage = () => {
    setAttributes({
      oneImageId: 0,
      oneImageData: {
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

  // Handler - twoImage
  const twoOnSelectImage = (media) => {
    setAttributes({
      twoImageId: media.id,
      twoImageData: {
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

  const twoOnRemoveImage = () => {
    setAttributes({
      twoImageId: 0,
      twoImageData: {
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
            <span className="block-info-title">🎨 Block 38 - Контакты с картинками</span>
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
                    <label className="my-rich-text__label">Заголовок 1</label>
                    <RichText
                      tagName="div"
                      label="Заголовок"
                      value={titleOne}
                      onChange={(value) => setAttributes({ titleOne: value })}
                      placeholder={__('Заголовок...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                  <FlexBlock>
                    <label className="my-rich-text__label">Заголовок 2</label>
                    <RichText
                      tagName="div"
                      label="Заголовок"
                      value={titleTwo}
                      onChange={(value) => setAttributes({ titleTwo: value })}
                      placeholder={__('Заголовок...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex align="flex-start">
                  <FlexBlock>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={oneOnSelectImage}
                        allowedTypes={['image']}
                        value={oneImageId}
                        render={({ open }) => (
                          <div className="advanced-block-image advanced-block-image-100">
                            <div className="label-image">Картинка (1)</div>
                            {oneImageData.url ? (
                              <>
                                <img
                                  src={oneImageData.url}
                                  className="advanced-image-preview"
                                  alt=""
                                  style={{ borderRadius: '8px' }}
                                />
                                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                  <Button onClick={open} variant="secondary" size="small">
                                    ✏️ {__('Изменить', 'theme')}
                                  </Button>
                                  <Button
                                    onClick={oneOnRemoveImage}
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
                  <FlexBlock>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={twoOnSelectImage}
                        allowedTypes={['image']}
                        value={twoImageId}
                        render={({ open }) => (
                          <div className="advanced-block-image advanced-block-image-100">
                            <div className="label-image">Картинка (2)</div>
                            {twoImageData.url ? (
                              <>
                                <img
                                  src={twoImageData.url}
                                  className="advanced-image-preview"
                                  alt=""
                                  style={{ borderRadius: '8px' }}
                                />
                                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                  <Button onClick={open} variant="secondary" size="small">
                                    ✏️ {__('Изменить', 'theme')}
                                  </Button>
                                  <Button
                                    onClick={twoOnRemoveImage}
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

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
