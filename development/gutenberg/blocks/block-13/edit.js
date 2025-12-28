import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload
} from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-13.jpg';

import { useAutoLinking } from '../../utils/useAutoLinking';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title,
    underlineColor,
    bgc,
    items
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style mgu-advantages'
  });

  // Используем хук авто-линкинга
  const { autoLinkContent, postsCount } = useAutoLinking();

  // Обработчик авто-линкинга
  const handleAutoLink = () => {
    autoLinkContent(attributes, setAttributes, ['title']);
  };

  // Добавить новый элемент
  const addItem = () => {
    const newItems = [...items, {
      imageURL: '',
      imageID: 0,
      content: ''
    }];
    setAttributes({ items: newItems });
  };

  // Удалить элемент
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({ items: newItems });
  };

  // Обновить элемент
  const updateItem = (index, key, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setAttributes({ items: newItems });
  };

  // Переместить элемент вверх
  const moveItemUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setAttributes({ items: newItems });
  };

  // Переместить элемент вниз
  const moveItemDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setAttributes({ items: newItems });
  };

  // Обработчик выбора изображения
  const onSelectImage = (media, index) => {
    const newItems = items.map((item, i) =>
      i === index ? {
        ...item,
        imageURL: media.url,
        imageID: media.id
      } : item
    );
    setAttributes({ items: newItems });
  };

  // Обработчик удаления изображения
  const onRemoveImage = (index) => {
    const newItems = items.map((item, i) =>
      i === index ? {
        ...item,
        imageURL: '',
        imageID: 0
      } : item
    );
    setAttributes({ items: newItems });
  };

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
            <span className="block-info-title">🎨 Block 13 - Преимущества</span>
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
                <span>{__('Заголовок', 'theme')}</span>
                <RichText
                  tagName="div"
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                  placeholder={__('Заголовок...', 'theme')}
                  allowedFormats={['core/bold']}
                />
              </div>

              <div className="repeater-items numerations-items">
                {items.map((item, index) => (
                  <div key={index} className="repeater-item numerations-item">
                    <div className="repeater-item-controls">
                      <Button
                        isSmall
                        onClick={() => moveItemUp(index)}
                        disabled={index === 0}
                        className="controls-arrow"
                      >
                        {__('⬅️', 'theme')}
                      </Button>
                      <Button
                        isSmall
                        onClick={() => moveItemDown(index)}
                        disabled={index === items.length - 1}
                        className="controls-arrow"
                      >
                        {__('➡️', 'theme')}
                      </Button>
                      <Button
                        isSmall
                        isDestructive
                        onClick={() => removeItem(index)}
                      >
                        {__('❌', 'theme')}
                      </Button>
                    </div>

                    <MediaUpload
                      onSelect={(media) => onSelectImage(media, index)}
                      allowedTypes={['image']}
                      value={item.imageID}
                      render={({ open }) => (
                        <div className="repeater-image">
                          {item.imageURL ? (
                            <>
                              <img
                                src={item.imageURL}
                                alt=""
                                style={{ maxWidth: '64px', height: '64px', objectFit: 'contain' }}
                              />
                              <Button onClick={open} className="edit-icon">
                                {__('✍️', 'theme')}
                              </Button>
                              <Button
                                isDestructive
                                isSmall
                                onClick={() => onRemoveImage(index)}
                                className="delete-icon"
                              >
                                {__('❌', 'theme')}
                              </Button>
                            </>
                          ) : (
                            <Button onClick={open} className="add-icon">
                              {__('Добавить иконку', 'theme')}
                            </Button>
                          )}
                        </div>
                      )}
                    />

                    <RichText
                      tagName="div"
                      placeholder={__('Введите текст...', 'theme')}
                      value={item.content}
                      onChange={(value) => updateItem(index, 'content', value)}
                      className="repeater-content"
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'block', width: '100%' }}>
                <Button
                  style={{ display: 'block', width: '100%', marginInline: 'auto', border: '1px solid rgba(0,124,186,.5)' }}
                  onClick={addItem}
                >
                  {__('+ Добавить элемент', 'theme')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;