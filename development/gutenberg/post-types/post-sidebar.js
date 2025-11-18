import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import {
  PanelBody, TextControl, TextareaControl, ToggleControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

import { DateOnlyPicker } from "../components/DateTimePicker.js";

const PostSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'post') return null;

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
      <PluginSidebarMoreMenuItem target="post-sidebar" icon="admin-post">
        Настройки поста
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="post-sidebar" title="Настройки поста" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <DateOnlyPicker
            label="Дата"
            value={postMeta.date_start}
            onChange={(d) => updateMeta('date_start', d)}
          />

          <div style={{ height: '24px' }} />

          <TextareaControl
            label="Краткое описание"
            placeholder="Краткое описание"
            value={postMeta.custom_excerpt || ''}
            onChange={(val) => updateMeta('custom_excerpt', val)}
            rows={12}
          />

          <div style={{ height: '24px' }} />

          <ToggleControl
            label="Логотип поверх картинки?"
            checked={!!postMeta.is_logotype}
            onChange={(val) => updateMeta('is_logotype', val)}
          />

          <ToggleControl
            label="Спец логотип поверх картинки?"
            checked={!!postMeta.is_logotype_special}
            onChange={(val) => updateMeta('is_logotype_special', val)}
          />

        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('post-sidebar', { render: PostSidebar });