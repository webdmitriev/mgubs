import { PanelBody, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { useOptimizedMedia } from '../../../utils/useOptimizedMedia';

const ImagePanel = ({ attributes, setAttributes }) => {
  const { imageUrl, imageWebp, imageId } = attributes;

  // Handlers image
  const { onSelectImage } = useOptimizedMedia(setAttributes);
  const onRemoveImage = () => setAttributes({ imageUrl: '', imageWebp: '', imageId: 0 });

  return (
    <PanelBody title={__('Картинки', 'theme')} initialOpen={false}>
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
    </PanelBody>
  );
};

export default ImagePanel;
