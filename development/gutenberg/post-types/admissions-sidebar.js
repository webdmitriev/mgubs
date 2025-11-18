import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import {
  PanelBody,
  TextareaControl,
  Button,
  Spinner
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const AdmissionsSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'admissions') return null;

  const postMeta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta') || {},
    []
  );
  const { editPost } = useDispatch('core/editor');

  const updateMeta = (key, value) => {
    editPost({ meta: { ...postMeta, [key]: value } });
  };

  const fileId = postMeta.admission_file || 0;
  const [isUploading, setIsUploading] = useState(false);

  // Получаем данные файла (если он загружен)
  const fileData = useSelect(
    (select) => fileId ? select('core').getMedia(fileId) : null,
    [fileId]
  );

  // Функция загрузки файла
  const handleUpload = () => {
    const frame = wp.media({
      title: 'Выберите файл',
      button: { text: 'Использовать этот файл' },
      multiple: false,
      library: {
        type: ['application/pdf', 'image', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // можно расширить
      },
    });

    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      updateMeta('admission_file', attachment.id);
    });

    frame.open();
  };

  // Удаление файла
  const handleRemove = () => {
    updateMeta('admission_file', 0);
  };

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="allevents-sidebar" icon="admin-post">
        Настройки комиссии
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="allevents-sidebar" title="Настройки события" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <TextareaControl
            label="Краткое описание"
            placeholder="Краткое описание"
            value={postMeta.custom_excerpt || ''}
            onChange={(val) => updateMeta('custom_excerpt', val)}
            rows={12}
          />

          {/* Загрузка файла */}
          <div style={{ marginTop: 24 }}>
            <strong>Файл (программа, договор и т.д.)</strong>

            {isUploading && <Spinner />}

            {!fileId && !fileData && (
              <Button
                variant="secondary"
                onClick={handleUpload}
                style={{ marginTop: 8 }}
                isBusy={isUploading}
              >
                Загрузить файл
              </Button>
            )}

            {/* Загруженный файл — превью */}
            {fileData && (
              <div style={{ marginTop: 8, padding: 8, border: '1px solid #e2e4e7', borderRadius: 4, background: '#fff' }}>
                {fileData.media_type === 'image' ? (
                  <>
                    <img
                      src={fileData.source_url}
                      alt={fileData.alt_text || fileData.title?.rendered || 'Изображение'}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 4,
                        marginBottom: 12,
                      }}
                    />
                  </>
                ) : (
                  <p style={{ margin: '0 0 12px 0' }}>
                    <p>{console.log(fileData)}</p>
                    <strong>
                      <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                        {fileData.title?.rendered || '—'}
                      </a>
                    </strong>
                    <br />
                    <small style={{ color: '#555' }}>
                      PDF file • {fileData.slug || '—'}
                    </small>
                  </p>
                )}

                <Button variant="link" isDestructive onClick={handleRemove}>
                  Удалить файл
                </Button>
              </div>
            )}
          </div>
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('admissions-sidebar', { render: AdmissionsSidebar });