import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, ToggleControl, RadioControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useOptimizedMedia } from '../../utils/useOptimizedMedia';
import CF7FormSelector from '../../components/CF7FormSelector';
import mainBlockImg from '../../../../admin/assets/img/blocks/mgu-main.png';

import { useAutoLinking } from '../../utils/useAutoLinking';
import AutoLinkingPanel from '../../utils/AutoLinkingPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title,
    subTitleOne,
    subTitleTwo,
    divider,
    descr,
    imageUrl,
    imageWebp,
    imageId,
    cf7FormId,
    cf7Shortcode
  } = attributes;

  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'edit' | 'production'

  const blockProps = useBlockProps({
    className: 'development mgu-main'
  });

  // Используем хук авто-линкинга
  const { autoLinkContent, postsCount } = useAutoLinking();

  // Обработчик авто-линкинга
  const handleAutoLink = () => {
    autoLinkContent(attributes, setAttributes, ['subTitleOne', 'subTitleTwo', 'descr']);
  };

  // Handlers image
  const { onSelectImage } = useOptimizedMedia(setAttributes);
  const onRemoveImage = () => setAttributes({ imageUrl: '', imageWebp: '', imageId: 0 });

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
              <div className="rich-text">
                <span>{__('Подзаголовок', 'theme')}</span>
                <RichText
                  tagName="p"
                  value={subTitleOne}
                  onChange={(value) => setAttributes({ subTitleOne: value })}
                  placeholder={__('Подзаголовок...', 'theme')}
                  allowedFormats={['core/bold', 'core/italic', 'core/link']}
                />
              </div>
              <ToggleControl
                label={divider ? __('Убрать линию ❌', 'theme') : __('Добавить линию ✅', 'theme')}
                checked={divider}
                onChange={(value) => setAttributes({ divider: value })}
              />
              <div className="rich-text">
                <span>{__('Подзаголовок', 'theme')}</span>
                <RichText
                  tagName="p"
                  value={subTitleTwo}
                  onChange={(value) => setAttributes({ subTitleTwo: value })}
                  placeholder={__('Подзаголовок...', 'theme')}
                  allowedFormats={['core/bold', 'core/italic', 'core/link']}
                />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '16px' }}>
                <div className="advanced-block-images" style={{ display: 'block', width: '100%', maxWidth: '32%' }}>
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectImage}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div className="advanced-block-image">
                          {imageUrl ? (
                            <>
                              <img src={imageUrl} alt="" style={{ borderRadius: '8px' }} />
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                <Button onClick={open} variant="secondary" size="small">✏️ {__('Заменить', 'theme')}</Button>
                                <Button onClick={onRemoveImage} variant="tertiary" size="small" isDestructive>🗑 {__('Удалить', 'theme')}</Button>
                              </div>
                            </>
                          ) : (
                            <Button onClick={open} variant="primary" style={{ overflow: 'hidden' }}>
                              📷 {__('Фоновая картинка', 'theme')}
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </MediaUploadCheck>
                </div>
                <div className="rich-text" style={{ display: 'block', width: '100%', maxWidth: '66%' }}>
                  <span>{__('Описание', 'theme')}</span>
                  <RichText
                    tagName="p"
                    value={descr}
                    onChange={(value) => setAttributes({ descr: value })}
                    placeholder={__('Описание...', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/underline', 'core/text-color']}
                  />
                </div>
              </div>
              <div className="rich-text">
                <CF7FormSelector attributes={attributes} setAttributes={setAttributes} />
              </div>
            </div>
          )}

          {viewMode === 'production' && (
            <div className="advanced-block-preview">

              {imageUrl && (
                <picture>
                  {imageWebp && <source srcSet={imageWebp} type="image/webp" />}
                  <img
                    src={imageUrl}
                    alt=""
                    className="mgu-main__bg"
                    style={{ borderRadius: '8px' }}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              )}

              <div className="preview-content">
                <RichText.Content tagName="h1" value={title} className="h1" />
                <RichText.Content tagName="p" value={subTitleOne} className="sub_title" />
                {divider && (
                  <div className="divider"></div>
                )}
                <RichText.Content tagName="p" value={subTitleTwo} className="sub_title" />
                <RichText.Content tagName="p" value={descr} className="descr" />
              </div>
              <div className="wpcf7" dangerouslySetInnerHTML={{ __html: cf7Shortcode }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;