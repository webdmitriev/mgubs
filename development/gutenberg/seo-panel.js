import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { TextControl, TextareaControl, PanelBody, Button, BaseControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const SeoTab = () => {
  const postType = useSelect(
    (select) => select('core/editor').getCurrentPostType(),
    []
  );

  // Проверяем, поддерживается ли текущий post_type
  const supportedPostTypes = ['post', 'page'];

  if (!supportedPostTypes.includes(postType)) {
    return null;
  }

  const meta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta'),
    []
  );

  const { editPost } = useDispatch('core/editor');

  const updateMeta = (field, value) => {
    editPost({
      meta: {
        ...meta,
        [field]: value,
      },
    });
  };

  const onSelectImage = (field) => (image) => {
    updateMeta(field, image.url);
  };

  const onRemoveImage = (field) => () => {
    updateMeta(field, '');
  };

  const ImageControl = ({ label, value, help, field }) => (
    <BaseControl label={label} help={help}>
      <div style={{ marginBottom: '8px' }}>
        {value && (
          <div style={{ marginBottom: '8px' }}>
            <img
              src={value}
              alt="Preview"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '150px',
                display: 'block'
              }}
            />
          </div>
        )}
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectImage(field)}
            allowedTypes={['image']}
            value={value}
            render={({ open }) => (
              <Fragment>
                <Button
                  variant="secondary"
                  onClick={open}
                  style={{ marginRight: '8px' }}
                >
                  {value ? 'Заменить изображение' : 'Выбрать изображение'}
                </Button>
                {value && (
                  <Button
                    variant="tertiary"
                    isDestructive
                    onClick={onRemoveImage(field)}
                  >
                    Удалить
                  </Button>
                )}
              </Fragment>
            )}
          />
        </MediaUploadCheck>
      </div>
    </BaseControl>
  );

  return (
    <>
      <PluginSidebarMoreMenuItem target="seo-sidebar">
        СЕО
      </PluginSidebarMoreMenuItem>

      <PluginSidebar
        name="seo-sidebar"
        title="SEO Настройки"
        icon="admin-site"
      >
        <PanelBody>
          <TextareaControl
            label="SEO Description"
            value={meta._seo_description || ''}
            onChange={(value) => updateMeta('_seo_description', value)}
            help="Краткое описание страницы для поисковых систем"
          />
          <TextControl
            label="SEO Keywords"
            value={meta._seo_keywords || ''}
            onChange={(value) => updateMeta('_seo_keywords', value)}
            help="Ключевые слова через запятую"
          />

          {/* Open Graph */}
          <TextControl
            label="OG Title"
            value={meta._og_title || ''}
            onChange={(value) => updateMeta('_og_title', value)}
            help="Заголовок для Facebook и других социальных сетей"
          />
          <TextareaControl
            label="OG Description"
            value={meta._og_description || ''}
            onChange={(value) => updateMeta('_og_description', value)}
            help="Описание для социальных сетей"
          />
          <ImageControl
            label="OG Image"
            value={meta._og_image || ''}
            help="Изображение для социальных сетей"
            field="_og_image"
          />

          {/* Twitter */}
          <TextControl
            label="Twitter Title"
            value={meta._twitter_title || ''}
            onChange={(value) => updateMeta('_twitter_title', value)}
            help="Заголовок для Twitter"
          />
          <TextareaControl
            label="Twitter Description"
            value={meta._twitter_description || ''}
            onChange={(value) => updateMeta('_twitter_description', value)}
            help="Описание для Twitter"
          />
          <ImageControl
            label="Twitter Image"
            value={meta._twitter_image || ''}
            help="Изображение для Twitter"
            field="_twitter_image"
          />
        </PanelBody>
      </PluginSidebar>
    </>
  );
};

registerPlugin('seo-tab', {
  render: SeoTab,
  icon: 'admin-site',
});