import { useState } from '@wordpress/element';
import {
  useBlockProps, RichText,
  InspectorControls, MediaUpload, MediaUploadCheck,
  URLInput
} from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-01.jpg';

import colors from '../../utils/default-colors.js';
import ColorSelect from '../../components/ColorSelect';
import { DateTimeSeparatePicker } from "../../components/DateTimePicker.js";

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title, date, time, buttonText, buttonLink,
    isContent, second_title, description, items,
    imageData, imageId, rgba } = attributes;

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

  // Преобразуем цвета в нужный формат
  const colorPalette = colors.map(colorObj => ({
    name: colorObj.name,
    color: colorObj.color,
    slug: colorObj.name.toLowerCase().replace(/\s+/g, '-')
  }));

  const itemsList = useAttributeList(attributes, setAttributes, 'items');

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
            <span className="block-info-title">🎨 Block 34 - Главный блок (события)</span>
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
                <div style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
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
                    <FlexBlock>
                      <DateTimeSeparatePicker
                        label="Дата и время события"
                        dateValue={date}
                        timeValue={time}
                        onDateChange={(d) => setAttributes({ date: d })}
                        onTimeChange={(t) => setAttributes({ time: t })}
                      />
                    </FlexBlock>
                  </Flex>

                  <div style={{ height: 14 }} />

                  <Flex>
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

                <div style={{ height: 24 }} />

                <Flex>
                  <FlexItem>
                    <label className="my-rich-text__label">Какой контент справа?</label>
                    <ToggleControl
                      label={isContent ? __('Описание', 'theme') : __('Пункты', 'theme')}
                      checked={isContent}
                      onChange={(value) => setAttributes({ isContent: value })}
                    />
                  </FlexItem>
                </Flex>

                {isContent ? (
                  <div style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                    <Flex>
                      <FlexBlock>
                        <label className="my-rich-text__label">Второй заголовок</label>
                        <RichText
                          tagName="div"
                          value={second_title}
                          onChange={(value) => setAttributes({ second_title: value })}
                          placeholder={__('Второй заголовок...', 'theme')}
                          allowedFormats={[]}
                        />
                      </FlexBlock>
                    </Flex>

                    <div style={{ height: 12 }} />

                    <Flex>
                      <FlexBlock>
                        <label className="my-rich-text__label">Описание</label>
                        <RichText
                          tagName="div"
                          value={description}
                          onChange={(value) => setAttributes({ description: value })}
                          placeholder={__('Описание...', 'theme')}
                          allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                      </FlexBlock>
                    </Flex>
                  </div>
                ) : (
                  <div style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
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

                              {itemsList.renderBlockThirtyFour(item, index)}
                            </div>
                          ))}
                        </div>
                        <div style={{ height: 8 }} />
                        <Button
                          onClick={() => itemsList.add({ image: '', label: '', content: '' })}
                          className="add-repeater-item"
                          style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                        >
                          {__('+ Добавить элемент', 'theme')}
                        </Button>
                      </FlexBlock>
                    </Flex>
                  </div>
                )}
              </div>

              <div style={{ display: 'block', width: '100%', padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                <Flex align="flex-start">
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
                  <FlexBlock>
                    <ColorSelect
                      label="Цвет градиента"
                      colors={colorPalette}
                      value={rgba}
                      onChange={(val) => setAttributes({ rgba: val })}
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
