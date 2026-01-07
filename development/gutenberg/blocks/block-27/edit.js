import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, FlexItem, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-27.jpg';

import PictureBgEdit from '../../components/PictureBgEdit';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { isStandard, isRevers, isTopTitle, title, content, imageId, imageData } = attributes;

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

  const bgSizes = [1920];
  // Handler - bg
  const getOnSelectBg = (size) => (media) => {
    setAttributes({
      [`bg${size}Id`]: media.id,
      [`bg${size}Data`]: {
        url: media.url,
        alt: media.alt || '',
        responsive: media.responsive || {
          webp: '',
          jpg: '',
          default: media.url,
        },
      },
    });
  };

  const getOnRemoveBg = (size) => () => {
    setAttributes({
      [`bg${size}Id`]: 0,
      [`bg${size}Data`]: {
        url: '',
        alt: '',
        responsive: {
          webp: '',
          jpg: '',
          default: '',
        },
      },
    });
  };

  const blockProps = useBlockProps({
    className: 'block-style block-style-27'
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
            <span className="block-info-title">🎨 Block 27 - Текст и картинка</span>
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
              <div style={{
                width: '100%',
                padding: '12px 8px',
                border: '2px dashed #ddd',
                borderRadius: '5px'
              }}>
                <Flex justify="flex-start">
                  <FlexItem>
                    <label className="my-rich-text__label">Поменять местами?</label>
                    <ToggleControl
                      label={isRevers ? __('Картинка справа', 'theme') : __('Картинка слева', 'theme')}
                      checked={isRevers}
                      onChange={(value) => setAttributes({ isRevers: value })}
                    />
                  </FlexItem>
                  <FlexItem> </FlexItem>
                  <FlexItem>
                    <label className="my-rich-text__label">Стиль блока:</label>
                    <ToggleControl
                      label={isStandard ? __('Стиль 02', 'theme') : __('Стиль 01', 'theme')}
                      checked={isStandard}
                      onChange={(value) => setAttributes({ isStandard: value })}
                    />
                  </FlexItem>
                </Flex>
              </div>

              <div style={{ height: 12 }} />

              <div className={`my-block-content-image ${isRevers ? '' : 'my-block-content-image-revers'}`}>
                <div className="my-block-content">
                  <>
                    <label className="my-rich-text__label">Вынести заголовок выше за контент?</label>
                    <ToggleControl
                      label={isTopTitle ? __('Да ✅', 'theme') : __('Нет ❌', 'theme')}
                      checked={isTopTitle}
                      onChange={(value) => setAttributes({ isTopTitle: value })}
                    />
                  </>
                  <>
                    <label className="my-rich-text__label">Заголовок</label>
                    <RichText
                      tagName="div"
                      label="Заголовок"
                      value={title}
                      onChange={(value) => setAttributes({ title: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </>
                  <>
                    <label className="my-rich-text__label">Описание</label>
                    <RichText
                      tagName="div"
                      label="Описание"
                      value={content}
                      onChange={(value) => setAttributes({ content: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </>
                </div>
                <div className="my-block-image">
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
                </div>
              </div>

              <div style={{ display: 'block', width: '100%', height: 2 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                {bgSizes.map((size) => (
                  <PictureBgEdit
                    key={size}
                    label={`Фон ${size}px`}
                    imageId={attributes[`bg${size}Id`]}
                    imageData={attributes[`bg${size}Data`]}
                    onSelect={getOnSelectBg(size)}
                    onRemove={getOnRemoveBg(size)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;