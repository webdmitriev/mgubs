import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-30.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title, items,
    authorImageId, authorImageData, authorName, authorData,
    imageId, imageData
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const itemsList = useAttributeList(attributes, setAttributes, 'items');

  // Handler - author
  const onSelectImageAuthor = (media) => {
    setAttributes({
      authorImageId: media.id,
      authorImageData: {
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

  const onRemoveImageAuthor = () => {
    setAttributes({
      authorImageId: 0,
      authorImageData: {
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
            <span className="block-info-title">🎨 Block 30 - Мы другие</span>
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

              <Flex>
                <FlexBlock>
                  <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                    {items.map((item, index) => (
                      <div key={index} className="repeater-item numerations-item">
                        <div className="items-control">
                          <div className="items-control__buttons">
                            <Button onClick={() => itemsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                            <Button onClick={() => itemsList.moveDown(index)} disabled={index === items.length - 1} style={{ opacity: index === (items.length - 1) ? 0.4 : 1 }}>➡️</Button>
                          </div>
                          <Button isDestructive onClick={() => itemsList.remove(index)}>❌</Button>
                        </div>

                        {itemsList.renderBlockThirty(item, index)}
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 12 }} />
                  <Button
                    onClick={() => itemsList.add({ content: '' })}
                    className="add-repeater-item"
                    style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                  >
                    {__('+ Добавить элемент', 'theme')}
                  </Button>
                </FlexBlock>
              </Flex>

              <Flex>
                <FlexBlock>
                  <label className="my-rich-text__label">Лейбл</label>
                  <RichText
                    tagName="div"
                    label="Лейбл"
                    value={authorName}
                    onChange={(value) => setAttributes({ authorName: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
              </Flex>

              <Flex>
                <FlexBlock>
                  <label className="my-rich-text__label">Описание</label>
                  <RichText
                    tagName="div"
                    label="Описание"
                    value={authorData}
                    onChange={(value) => setAttributes({ authorData: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
              </Flex>

              <Flex align="flex-start">
                <FlexBlock>
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectImageAuthor}
                      allowedTypes={['image']}
                      value={authorImageId}
                      render={({ open }) => (
                        <div className="advanced-block-image advanced-block-image-100">
                          <div className="label-image">Картинка (1)</div>
                          {authorImageData.url ? (
                            <>
                              <img
                                src={authorImageData.url}
                                className="advanced-image-preview"
                                alt=""
                                style={{ borderRadius: '8px' }}
                              />
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                <Button onClick={open} variant="secondary" size="small">
                                  ✏️ {__('Изменить', 'theme')}
                                </Button>
                                <Button
                                  onClick={onRemoveImageAuthor}
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
                      onSelect={onSelectImage}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div className="advanced-block-image advanced-block-image-100">
                          <div className="label-image">Картинка (2)</div>
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