import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { PanelBody, ToggleControl, TextareaControl, RangeControl, Flex } from '@wordpress/components';
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
      <PluginSidebarMoreMenuItem target="page-sidebar" icon="admin-post">Настройки странциы</PluginSidebarMoreMenuItem>

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

          <div style={{ height: '24px' }} />

          <Flex direction="column" gap="8">
            <RangeControl
              label={
                <div>Затемнение картинки (0-10): <strong style={{ paddingBlock: '2px', paddingInline: '4px', color: '#fff', backgroundColor: '#000' }}>{parseFloat(postMeta.shadow_image) || 0}</strong></div>
              }
              value={parseFloat(postMeta.shadow_image) || 0}
              onChange={(val) => {
                updateMeta('shadow_image', val.toFixed(1));
              }}
              min={0}
              max={10}
              step={1}
              withInputField={false}
            />
          </Flex>

        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('page-sidebar', { render: PageSidebar });