import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { PanelBody, TextareaControl, ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const TeachersSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'teachers') return null;

  const postMeta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta') || {},
    []
  );
  const { editPost } = useDispatch('core/editor');

  const updateMeta = (key, value) => {
    editPost({ meta: { ...postMeta, [key]: value } });
  };

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="allevents-sidebar" icon="admin-post">Настройки препод.</PluginSidebarMoreMenuItem>

      <PluginSidebar name="allevents-sidebar" title="Преподаватель" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <TextareaControl
            label="Кто я?"
            placeholder="Кто я?"
            value={postMeta.position}
            onChange={(val) => updateMeta('position', val)}
            rows={4}
            help="Используйте Enter для переноса строки."
          />

          <div style={{ height: '24px' }} />

          <TextareaControl
            label="Краткое описание"
            placeholder="Краткое описание"
            value={postMeta.custom_excerpt || ''}
            onChange={(val) => updateMeta('custom_excerpt', val)}
            rows={12}
            help="Используйте Enter для переноса строки."
          />

          <div style={{ height: '14px' }} />

          <ToggleControl
            label={!!postMeta.is_button_off ? 'Кнопка видна' : 'Кнопка скрыта'}
            checked={!!postMeta.is_button_off}
            onChange={(val) => updateMeta('is_button_off', val)}
          />
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('teachers-sidebar', { render: TeachersSidebar });