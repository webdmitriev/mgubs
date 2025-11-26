import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { PanelBody, ToggleControl, TextareaControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const PageSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'page') return null;

  const postMeta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta') || {},
    []
  );
  const { editPost } = useDispatch('core/editor');

  const updateMeta = (key, value) => {
    editPost({ meta: { ...postMeta, [key]: value } });
  };

  // Функция для обработки текста с <br/> тегами
  const handleTextareaChange = (value) => {
    // Заменяем <br/> на \n для отображения в textarea
    const textareaValue = value.replace(/<br\s*\/?>/gi, '\n');
    updateMeta('custom_excerpt', textareaValue);
  };

  // Функция для получения значения textarea
  const getTextareaValue = () => {
    const value = postMeta.custom_excerpt || '';
    // Заменяем \n на <br/> для хранения в базе
    return value.replace(/\n/g, '<br/>');
  };

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="page-sidebar" icon="admin-post">
        Настройки странциы
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="page-sidebar" title="Настройки странциы" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <ToggleControl
            label="Подключить Jivo chat?"
            checked={!!postMeta.is_jivo_chat}
            onChange={(val) => updateMeta('is_jivo_chat', val)}
          />

          <div style={{ height: '24px' }} />

          <TextareaControl
            label="Заголовок для отображения"
            placeholder="Заголовок"
            value={postMeta.custom_title || ''}
            onChange={(val) => updateMeta('custom_title', val)}
            rows={3}
            help="Используйте Enter для переноса строки."
          />

          <div style={{ height: '12px' }} />

          <TextareaControl
            label="Краткое описание"
            placeholder="Краткое описание"
            value={postMeta.custom_excerpt || ''}
            onChange={(val) => updateMeta('custom_excerpt', val)}
            rows={8}
            help="Используйте Enter для переноса строки."
          />

        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('page-sidebar', { render: PageSidebar });