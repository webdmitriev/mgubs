import { useState } from '@wordpress/element';
import {
  useBlockProps, RichText,
  InspectorControls, MediaUpload, MediaUploadCheck,
  URLInput
} from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-36.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    blockIconId, blockIconData, blockTitle, blockItems, buttonText, buttonLink,
    imageId, imageData,
    itemsData, itemsNumbers, bottomTitle, bottomDescr
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockItemsList = useAttributeList(attributes, setAttributes, 'blockItems');
  const itemsDataList = useAttributeList(attributes, setAttributes, 'itemsData');
  const itemsNumbersList = useAttributeList(attributes, setAttributes, 'itemsNumbers');

  // Handler - icon
  const onSelectIcon = (media) => {
    setAttributes({
      blockIconId: media.id,
      blockIconData: {
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

  const onRemoveIcon = () => {
    setAttributes({
      blockIconId: 0,
      blockIconData: {
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
            <span className="block-info-title">🎨 Block 30 - Контакты с картой</span>
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
              <div className="advanced-block-text" style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                <Flex align="flex-start">
                  <div style={{ display: 'block', width: '160px' }}>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={onSelectIcon}
                        allowedTypes={['image']}
                        value={blockIconId}
                        render={({ open }) => (
                          <div className="advanced-block-image advanced-block-image-100">
                            {blockIconData.url ? (
                              <>
                                <img
                                  src={blockIconData.url}
                                  className="advanced-image-preview"
                                  alt=""
                                  style={{ width: '100%', height: 'inherit', objectFit: 'contain' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                                  <Button onClick={open} variant="secondary" size="small">
                                    ✏️ {__(' ', 'theme')}
                                  </Button>
                                  <Button
                                    onClick={onRemoveIcon}
                                    variant="tertiary"
                                    size="small"
                                    isDestructive
                                  >
                                    🗑 {__(' ', 'theme')}
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <Button onClick={open} variant="primary">
                                📷 {__('Добавить иконку', 'theme')}
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>
                  <FlexBlock>
                    <FlexBlock>
                      <label className="my-rich-text__label">Заголовок:</label>
                      <RichText
                        tagName="div"
                        label="Заголовок"
                        value={blockTitle}
                        onChange={(value) => setAttributes({ blockTitle: value })}
                        placeholder={__('Заголовок...', 'theme')}
                        allowedFormats={[]}
                      />
                    </FlexBlock>
                    <FlexBlock>
                      <div style={{ height: 12 }} />
                      <label className="my-rich-text__label">Контакты:</label>
                      <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                        {blockItems.map((item, index) => (
                          <div key={index} className="repeater-item numerations-item">
                            <div className="items-control">
                              <div className="items-control__buttons">
                                <Button onClick={() => blockItemsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                                <Button onClick={() => blockItemsList.moveDown(index)} disabled={index === blockItems.length - 1} style={{ opacity: index === (blockItems.length - 1) ? 0.4 : 1 }}>➡️</Button>
                              </div>
                              <Button isDestructive onClick={() => blockItemsList.remove(index)}>❌</Button>
                            </div>

                            {blockItemsList.renderBlockThirtySix(item, index)}
                          </div>
                        ))}
                      </div>
                      <div style={{ height: 12 }} />
                      <Button
                        onClick={() => blockItemsList.add({ image: '', label: '' })}
                        className="add-repeater-item"
                        style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                      >
                        {__('+ Добавить элемент', 'theme')}
                      </Button>
                    </FlexBlock>
                  </FlexBlock>
                </Flex>
                <Flex><div style={{ height: 24 }} /></Flex>
                <Flex align="flex-start">
                  <FlexBlock>
                    <label className="my-rich-text__label">Кнопка - текст</label>
                    <RichText
                      tagName="div"
                      label="Подзаголовок"
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
              <div className="advanced-block-text" style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                      <div className="advanced-block-image advanced-block-image-100" style={{ marginBottom: 0 }}>
                        <div className="label-image">Картинка карты</div>
                        {imageData.url ? (
                          <>
                            <img
                              src={imageData.url}
                              className="advanced-image-preview"
                              alt=""
                              style={{ width: '100%', height: 'inherit', objectFit: 'contain' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
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
                            📷 {__('Добавить', 'theme')}
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>
              <div className="advanced-block-text" style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Пункты с иконкой</label>
                    <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                      {itemsData.map((item, index) => (
                        <div key={index} className="repeater-item numerations-item">
                          <div className="items-control">
                            <div className="items-control__buttons">
                              <Button onClick={() => itemsDataList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                              <Button onClick={() => itemsDataList.moveDown(index)} disabled={index === itemsData.length - 1} style={{ opacity: index === (itemsData.length - 1) ? 0.4 : 1 }}>➡️</Button>
                            </div>
                            <Button isDestructive onClick={() => itemsDataList.remove(index)}>❌</Button>
                          </div>

                          {itemsDataList.renderBlockThirtySixSecond(item, index)}
                        </div>
                      ))}
                    </div>
                    <div style={{ height: 12 }} />
                    <Button
                      onClick={() => itemsDataList.add({ image: '', label: '' })}
                      className="add-repeater-item"
                      style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                    >
                      {__('+ Добавить элемент', 'theme')}
                    </Button>
                  </FlexBlock>
                </Flex>
                <Flex>
                  <FlexBlock>
                    <div style={{ height: 40 }} />
                    <label className="my-rich-text__label">Пункты с нумерацией</label>
                    <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                      {itemsNumbers.map((item, index) => (
                        <div key={index} className="repeater-item numerations-item">
                          <div className="items-control">
                            <div className="items-control__buttons">
                              <Button onClick={() => itemsNumbersList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                              <Button onClick={() => itemsNumbersList.moveDown(index)} disabled={index === itemsNumbers.length - 1} style={{ opacity: index === (itemsNumbers.length - 1) ? 0.4 : 1 }}>➡️</Button>
                            </div>
                            <Button isDestructive onClick={() => itemsNumbersList.remove(index)}>❌</Button>
                          </div>

                          {itemsNumbersList.renderBlockThirtySixThird(item, index)}
                        </div>
                      ))}
                    </div>
                    <div style={{ height: 12 }} />
                    <Button
                      onClick={() => itemsNumbersList.add({ num: '', label: '' })}
                      className="add-repeater-item"
                      style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                    >
                      {__('+ Добавить элемент', 'theme')}
                    </Button>
                  </FlexBlock>
                </Flex>
              </div>
              <div className="advanced-block-text" style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Заголовок (нижний):</label>
                    <RichText
                      tagName="div"
                      label="Заголовок"
                      value={bottomTitle}
                      onChange={(value) => setAttributes({ bottomTitle: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                </Flex>
                <Flex>
                  <FlexBlock>
                    <div style={{ height: 12 }} />
                    <label className="my-rich-text__label">Описание (нижний):</label>
                    <RichText
                      tagName="div"
                      label="Описание"
                      value={bottomDescr}
                      onChange={(value) => setAttributes({ bottomDescr: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
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
