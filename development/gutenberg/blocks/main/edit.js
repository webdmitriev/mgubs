import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useAutoLinking } from '../../utils/useAutoLinking';
import AutoLinkingPanel from '../../utils/AutoLinkingPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title,
    subTitle,
    imageUrl,
    imageId,
    items
  } = attributes;

  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'main'
  });

  // Используем хук авто-линкинга
  const { autoLinkContent, postsCount } = useAutoLinking();

  // Обработчик авто-линкинга
  const handleAutoLink = () => {
    autoLinkContent(attributes, setAttributes, ['title', 'subTitle', 'items']);
  };

  // Handlers
  const onSelectImage = (media) => {
    setAttributes({
      imageUrl: media.url,
      imageId: media.id,
    });
  };

  const onRemoveImage = () => {
    setAttributes({ imageUrl: '', imageId: 0 });
  };

  // Добавить новый элемент
  const addItem = () => {
    const newItems = [...items, {
      content: ``
    }];
    setAttributes({ items: newItems });
  };

  // Удалить элемент
  const removeItem = (index) => {
    if (items.length <= 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({ items: newItems });
  };

  // Обновить элемент
  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
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
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <span className="block-info-title">🎨 Главный блок</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {isPreview && (
            <div className="advanced-block-content">
              <div className="advanced-block-text">

                <RichText
                  tagName="h1"
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                  placeholder={__('Add title...', 'theme')}
                  allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  className="block-title"
                />

                <RichText
                  tagName="div"
                  value={subTitle}
                  onChange={(value) => setAttributes({ subTitle: value })}
                  placeholder={__('Введите текст и создавайте списки через тулбар...', 'theme')}
                  allowedFormats={[
                    'core/bold',
                    'core/italic',
                    'core/link',
                    'core/strikethrough',
                    'core/text-color',
                    'theme/li-format'
                  ]}
                  className="block-content"
                />

              </div>

              <div className="advanced-block-images">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                      <div className="advanced-block-image">
                        {imageUrl ? (
                          <>
                            <img
                              src={imageUrl}
                              className="advanced-image-preview"
                              alt=""
                              style={{ borderRadius: '8px' }}
                            />
                            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                              <Button onClick={open} variant="secondary" size="small">
                                ✏️ {__('Change', 'theme')}
                              </Button>
                              <Button
                                onClick={onRemoveImage}
                                variant="tertiary"
                                size="small"
                                isDestructive
                              >
                                🗑 {__('Delete', 'theme')}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button onClick={open} variant="primary">
                            📷 {__('Add image', 'theme')}
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>

              <div className="advanced-block-items">
                {items.map((item, index) => (
                  <div key={index} className="repeater-item">
                    <div className="item-header">
                      {items.length > 1 && (
                        <Button
                          onClick={() => removeItem(index)}
                          variant="tertiary"
                          icon="trash"
                          isDestructive
                          className="remove-item-btn"
                        />
                      )}
                    </div>

                    <div className="item-content">
                      <div className="item-text-section">
                        <RichText
                          tagName="div"
                          value={item.content}
                          onChange={(value) => updateItem(index, 'content', value)}
                          placeholder={__('Add text...', 'theme')}
                          allowedFormats={[
                            'core/bold',
                            'core/italic',
                            'core/link',
                            'core/strikethrough',
                            'core/text-color',
                          ]}
                          className="block-content"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Кнопка добавления в конце */}
                <div className="repeater-footer">
                  <Button
                    onClick={addItem}
                    variant="primary"
                    icon="plus"
                  >
                    {__('Add element', 'theme')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!isPreview && (
            <div className="advanced-block-preview">
              <div className="preview-content">
                <RichText.Content tagName="h1" value={title} className="h1" />
                <RichText.Content tagName="p" value={subTitle} className="descr" />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Edit;