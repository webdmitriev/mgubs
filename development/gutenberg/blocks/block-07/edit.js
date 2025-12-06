import { useState } from '@wordpress/element';
import {
  useBlockProps, RichText, InspectorControls, URLInput,
  MediaUpload, MediaUploadCheck
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextareaControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-07.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { anchor, bgc, title, descr, buttonText, buttonLink, widgetTitle, widgetSocials, widgetImageId, widgetImageData, posts } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Используем хук для widgetSocials
  const widgetSocialsList = useAttributeList(attributes, setAttributes, 'widgetSocials');
  const postsList = useAttributeList(attributes, setAttributes, 'posts');

  // Handler - widgetImage
  const onSelectImage = (media) => {
    setAttributes({
      widgetImageId: media.id,
      widgetImageData: {
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
      widgetImageId: 0,
      widgetImageData: {
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
        <PanelBody title={__('Виджет', 'theme')} initialOpen={false}>
          <div className="about-widget">
            <>
              <label className="my-rich-text__label" style={{ display: 'block', marginBottom: '4px' }}>Заголовок</label>
              <TextareaControl
                value={widgetTitle}
                onChange={(value) => setAttributes({ widgetTitle: value })}
                placeholder={__('Заголовок...', 'theme')}
                rows={1}
              />
            </>

            <div className="repeater-items">
              <label className="my-rich-text__label" style={{ display: 'block', marginBottom: '4px' }}>Соц. сети</label>
              {widgetSocials.map((item, index) => (
                <div key={index} className="repeater-item">
                  <div className="items-control" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="items-control__buttons">
                      <Button onClick={() => widgetSocialsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                      <Button onClick={() => widgetSocialsList.moveDown(index)} disabled={index === widgetSocials.length - 1} style={{ opacity: index === (widgetSocials.length - 1) ? 0.4 : 1 }}>➡️</Button>
                    </div>
                    <Button isDestructive onClick={() => widgetSocialsList.remove(index)}>❌</Button>
                  </div>

                  {widgetSocialsList.renderSelectTextareaControl(item, index)}

                </div>
              ))}
            </div>

            <Button
              onClick={() => widgetSocialsList.add({ imageName: '', link: '' })}
              className="add-repeater-item"
              style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
            >
              {__('+ Добавить элемент', 'theme')}
            </Button>

            {/*  */}
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={['image']}
                value={widgetImageId}
                render={({ open }) => (
                  <div className="advanced-block-image" style={{ display: 'block', marginTop: 24 }}>
                    <div className="label-image" style={{ display: 'block', marginBottom: 8 }}>Картинка (куб)</div>
                    {widgetImageData.url ? (
                      <>
                        <img
                          src={widgetImageData.url}
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
          </div>
        </PanelBody>
        <PanelBody title={__('Посты', 'theme')} initialOpen={false}>
          {posts.map((item, index) => (
            <div key={index} className="repeater-item">
              <div className="items-control" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="items-control__buttons">
                  <Button onClick={() => postsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                  <Button onClick={() => postsList.moveDown(index)} disabled={index === posts.length - 1} style={{ opacity: index === (posts.length - 1) ? 0.4 : 1 }}>➡️</Button>
                </div>
                <Button isDestructive onClick={() => postsList.remove(index)}>❌</Button>
              </div>

              {postsList.renderTextareaToTextarea(item, index)}
            </div>
          ))}
          <Button
            onClick={() => postsList.add({ text: '', link: '' })}
            className="add-repeater-item"
            style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
          >
            {__('+ Добавить элемент', 'theme')}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 07 - О школе</span>
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
                <>
                  <label className="my-rich-text__label">Заголовок</label>
                  <RichText
                    tagName="div"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
                <>
                  <label className="my-rich-text__label">Описание</label>
                  <RichText
                    tagName="div"
                    value={descr}
                    onChange={(value) => setAttributes({ descr: value })}
                    placeholder={__('Описание...', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  />
                </>
                <div className="richtext-to-select">
                  <div className="richtext-to-select__item">
                    <label className="my-rich-text__label">Текст кнопки</label>
                    <RichText
                      tagName="div"
                      value={buttonText}
                      onChange={(value) => setAttributes({ buttonText: value })}
                      placeholder={__('Текст кнопки...', 'theme')}
                      allowedFormats={[]}
                    />
                  </div>
                  <div className="richtext-to-select__item">
                    <label className="my-rich-text__label">Ссылка кнопки</label>
                    <URLInput
                      value={buttonLink}
                      onChange={(value) => setAttributes({ buttonLink: value })}
                      placeholder={__('Введите название страницы или url', 'theme')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
