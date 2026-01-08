import { useState } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-52.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { shadow, video, imageId, imageData } = attributes;

  const [isPreview, setIsPreview] = useState(false);

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

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style mgu-advantages'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 47 - Видео</span>
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
                </FlexBlock>
              </Flex>

              <div style={{ height: '8px' }} />

              <Flex>
                <FlexBlock>
                  <label className="my-rich-text__label">Rutube</label>
                  <TextControl
                    placeholder={__('c08e1819ea06326802310c2f2dbf40ca...', 'theme')}
                    value={video}
                    onChange={(value) => setAttributes({ video: value })}
                  />
                </FlexBlock>
              </Flex>

              <div style={{ height: '8px' }} />

              <Flex direction="column" gap="8">
                <FlexBlock>
                  <RangeControl
                    label={
                      <div>Затемнение картинки (0-10): <strong style={{ paddingBlock: '2px', paddingInline: '4px', color: '#fff', backgroundColor: '#000' }}>{shadow || 0}</strong></div>
                    }
                    value={shadow || 0}
                    onChange={(val) => setAttributes({ shadow: val })}
                    min={0}
                    max={9}
                    step={1}
                    withInputField={false}
                  />
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