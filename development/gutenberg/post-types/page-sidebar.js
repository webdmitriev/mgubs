import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import {
  PanelBody, ToggleControl,
} from '@wordpress/components';
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

        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('page-sidebar', { render: PageSidebar });