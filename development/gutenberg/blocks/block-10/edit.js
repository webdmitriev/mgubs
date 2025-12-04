import { useState, useEffect } from '@wordpress/element';
import {
  useBlockProps, InspectorControls, RichText,
  MediaUpload, MediaUploadCheck
} from '@wordpress/block-editor';
import { Button, SelectControl, ToggleControl, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subTitle, imageOneId, imageOneData, imageTwoId, imageTwoData, contacts } = attributes;
  const [isPreview, setIsPreview] = useState(true);

  const contactsList = useAttributeList(attributes, setAttributes, 'contacts');

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Handler - image one
  const onSelectImageOne = (media) => {
    setAttributes({
      imageOneId: media.id,
      imageOneData: {
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

  const onRemoveImageOne = () => {
    setAttributes({
      imageOneId: 0,
      imageOneData: {
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

  // Handler - image two
  const onSelectImageTwo = (media) => {
    setAttributes({
      imageTwoId: media.id,
      imageTwoData: {
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

  const onRemoveImageTwo = () => {
    setAttributes({
      imageTwoId: 0,
      imageTwoData: {
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

  const addItem = () => {
    setAttributes({
      contacts: [
        ...contacts,
        {
          label: '',
          content: '',
        }
      ]
    });
  };

  const blockProps = useBlockProps({
    className: "block-style",
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 10 - Контакты</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <div>Картинка</div>
          )}

          {isPreview && (
            <div className="advanced-block-content">
              <div style={{ width: '49%' }}>
                <label className="my-rich-text__label">Заголовок</label>
                <RichText
                  tagName="div"
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                  placeholder={__('Заголовок...', 'theme')}
                  allowedFormats={[]}
                />
              </div>

              <div style={{ width: '49%' }}>
                <label className="my-rich-text__label">Подзаголовок</label>
                <RichText
                  tagName="div"
                  value={subTitle}
                  onChange={(value) => setAttributes({ subTitle: value })}
                  placeholder={__('Подзаголовок...', 'theme')}
                  allowedFormats={[]}
                />
              </div>

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectImageOne}
                  allowedTypes={['image']}
                  value={imageOneId}
                  render={({ open }) => (
                    <div className="advanced-block-image advanced-block-image-48">
                      <div className="label-image">Картинка 1</div>
                      {imageOneData.url ? (
                        <>
                          <img
                            src={imageOneData.url}
                            className="advanced-image-preview"
                            alt=""
                            style={{ borderRadius: '8px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <Button onClick={open} variant="secondary" size="small">
                              ✏️ {__('Изменить', 'theme')}
                            </Button>
                            <Button
                              onClick={onRemoveImageOne}
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

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectImageTwo}
                  allowedTypes={['image']}
                  value={imageTwoId}
                  render={({ open }) => (
                    <div className="advanced-block-image advanced-block-image-48">
                      <div className="label-image">Картинка 2</div>
                      {imageTwoData.url ? (
                        <>
                          <img
                            src={imageTwoData.url}
                            className="advanced-image-preview"
                            alt=""
                            style={{ borderRadius: '8px' }}
                          />
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <Button onClick={open} variant="secondary" size="small">
                              ✏️ {__('Изменить', 'theme')}
                            </Button>
                            <Button
                              onClick={onRemoveImageTwo}
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

              <div className="teachers-block-grid contacts-items">
                {contacts.map((item, index) => (
                  <div key={index} className="repeater-item">
                    <div className="items-control" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="items-control__buttons">
                        <Button onClick={() => contactsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                        <Button onClick={() => contactsList.moveDown(index)} disabled={index === contacts.length - 1} style={{ opacity: index === (contacts.length - 1) ? 0.4 : 1 }}>➡️</Button>
                      </div>
                      <Button isDestructive onClick={() => contactsList.remove(index)}>❌</Button>
                    </div>

                    {contactsList.renderRichTextToRichText(item, index)}
                  </div>
                ))}
              </div>

              <div style={{ display: 'block', width: '100%' }}>
                <Button onClick={addItem} style={{ display: 'block', marginInline: 'auto', border: '1px solid rgba(0,124,186,.5)' }}>
                  + Добавить элемент
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