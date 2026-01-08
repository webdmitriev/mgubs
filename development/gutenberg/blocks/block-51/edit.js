import { useState } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-51.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { columns, gallery = [] } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const onSelectImage = (images) => {
    const formatted = images.map(img => ({
      imageId: img.id,
      imageData: {
        url: img.url,
        alt: img.alt || '',
        width: img.width,
        height: img.height,
        responsive: {
          webp: img.sizes?.medium?.url || img.url,
          jpg: img.sizes?.large?.url || img.url,
          default: img.url
        }
      }
    }));

    setAttributes({ gallery: formatted });
  };

  const clearGallery = () => {
    setAttributes({ gallery: [] });
  };

  const blockProps = useBlockProps({
    className: 'block-style mgu-advantages'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 51 - Новости: галерея</span>
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
                  <SelectControl
                    label="Кол-во колонок"
                    value={columns}
                    options={[
                      { label: '1 колонка', value: '1fr' },
                      { label: '2 колонки', value: '2fr' },
                      { label: '3 колонки', value: '3fr' }
                    ]}
                    onChange={(value) => setAttributes({ columns: value })}
                  />
                </FlexBlock>
              </Flex>

              {gallery.length === 0 ? (
                <div style={{ width: '100%', textAlign: 'center', padding: '40px', border: '2px dashed #ddd', borderRadius: '5px' }}>
                  <p style={{ color: '#999' }}>
                    {__('Нажмите "Выбрать изображения", чтобы добавить фото в галерею', 'theme')}
                  </p>
                </div>
              ) : (
                <div className="gallery-preview" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '15px',
                  width: '100%',
                }}>
                  {gallery.map((item, index) => (
                    <div
                      key={item.imageId || index}
                      className="gallery-item"
                      style={{
                        position: 'relative',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        src={item.imageData.url}
                        alt={item.imageData.alt}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    multiple
                    gallery
                    value={gallery.map(g => g.imageId)}
                    render={({ open }) => (
                      <Button onClick={open} variant="primary">{__('Выбрать изображения', 'theme')}</Button>
                    )}
                  />
                </MediaUploadCheck>

                {gallery.length > 0 && (
                  <Button onClick={clearGallery} variant="secondary" isDestructive>{__('Очистить галерею', 'theme')}</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;