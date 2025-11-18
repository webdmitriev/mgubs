import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

const SchoolHistorySidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'schoolhistory') return null;

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
      <PluginSidebarMoreMenuItem target="allevents-sidebar" icon="admin-post">
        Настройки истории
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="allevents-sidebar" title="Настройки события" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <TextControl
            label="Год?"
            placeholder="2025"
            value={postMeta.year}
            onChange={(val) => updateMeta('year', val)}
          />

          <div style={{ height: '24px' }} />

          <ToggleControl
            label="Отключить переход по ссылке?"
            checked={!!postMeta.is_link_off}
            onChange={(val) => updateMeta('is_link_off', val)}
          />
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('schoolhistory-sidebar', { render: SchoolHistorySidebar });