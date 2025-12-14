import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PictureBgEdit = ({
  label = __('Картинка (фон)', 'theme'),
  imageId,
  imageData,
  onSelect,
  onRemove,
}) => {
  return (
    <MediaUploadCheck>
      <MediaUpload
        onSelect={onSelect}
        allowedTypes={['image']}
        value={imageId}
        render={({ open }) => (
          <div className="advanced-block-image">
            <div className="label-image">{label}</div>

            {imageData?.url ? (
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
                    onClick={onRemove}
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
  );
};

export default PictureBgEdit;
