import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload
} from '@wordpress/block-editor';
import { Button, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import mainBlockImg from '../../../../admin/assets/img/blocks/mgu-advantages.png';

import { useAutoLinking } from '../../utils/useAutoLinking';
import AutoLinkingPanel from '../../utils/AutoLinkingPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import ColorPanel from './controls/ColorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title,
    underlineColor,
    bgc,
    items
  } = attributes;

  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'edit' | 'production'

  const blockProps = useBlockProps({
    style: { backgroundColor: bgc },
    className: 'development mgu-advantages'
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

        {/* Добавляем панель авто-линкинга */}
        <AutoLinkingPanel
          onAutoLink={handleAutoLink}
          postsCount={postsCount}
          disabled={postsCount === 0}
        />
        <ColorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <span className="block-info-title">🎨 Преимущества блок</span>
            <RadioControl
              selected={viewMode}
              options={[
                { label: __('Pveview ✍️', 'theme'), value: 'preview' },
                { label: __('Редактирование ☺️', 'theme'), value: 'edit' },
                { label: __('Результат 🖼️', 'theme'), value: 'production' },
              ]}
              onChange={(value) => setViewMode(value)}
            />
          </div>

          {viewMode === 'preview' && (
            <img
              src={mainBlockImg}
              className="preview-image"
              alt=""
              style={{ borderRadius: '8px' }}
            />
          )}

          {viewMode === 'edit' && (
            <div className="advanced-block-content">
              <div className="rich-text">
                <span>{__('Заголовок', 'theme')}</span>
                <RichText
                  tagName="h1"
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                  placeholder={__('Заголовок...', 'theme')}
                  allowedFormats={['core/bold']}
                />
              </div>

              <div className="repeater-items">
                {items.map((item, index) => (
                  <div key={index} className="repeater-item">
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
                        {__('Удалить блок', 'theme')}
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

              <Button
                isPrimary
                onClick={addItem}
                className="add-repeater-item"
              >
                {__('+ Добавить элемент', 'theme')}
              </Button>
            </div>
          )}

          {viewMode === 'production' && (
            <div className="container">
              <div className="block-title">
                <h2 className="h2" style={{ backgroundImage: `linear-gradient(180deg, ${underlineColor}, ${underlineColor})` }}>{title}</h2>
              </div>
              {items.map((item, index) => (
                <div key={index} className="advantages-item">
                  {item.imageURL && (
                    <img className="advantages-item__icon" src={item.imageURL} alt="alto" />
                  )}
                  <RichText.Content
                    tagName="div"
                    value={item.content}
                    className="advantages-item__content"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;