import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import {
  PanelBody, TextControl, TextareaControl, Button, Flex
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ManagerSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'manager') return null;

  const postMeta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta') || {},
    []
  );
  const { editPost } = useDispatch('core/editor');

  const updateMeta = (key, value) => {
    editPost({ meta: { ...postMeta, [key]: value } });
  };

  // Функции для работы с повторяющимся полем - phone
  const addPhoneItem = () => {
    const currentPhone = postMeta.phone || [];
    updateMeta('phone', [...currentPhone, '']);
  };
  const updatePhoneItem = (index, value) => {
    const currentPhone = postMeta.phone || [];
    const newPhone = [...currentPhone];
    newPhone[index] = value;
    updateMeta('phone', newPhone);
  };
  const removePhoneItem = (index) => {
    const currentPhone = postMeta.phone || [];
    const newPhone = currentPhone.filter((_, i) => i !== index);
    updateMeta('phone', newPhone);
  };
  const phoneItems = postMeta.phone || [];

  // Функции для работы с повторяющимся полем - email
  const addEmailItem = () => {
    const currentEmail = postMeta.email || [];
    updateMeta('email', [...currentEmail, '']);
  };
  const updateEmailItem = (index, value) => {
    const currentEmail = postMeta.email || [];
    const newEmail = [...currentEmail];
    newEmail[index] = value;
    updateMeta('email', newEmail);
  };
  const removeEmailItem = (index) => {
    const currentEmail = postMeta.email || [];
    const newEmail = currentEmail.filter((_, i) => i !== index);
    updateMeta('email', newEmail);
  };
  const emailItems = postMeta.email || [];

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="manager-sidebar" icon="admin-post">
        Настройки менеджер
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="manager-sidebar" title="Настройки менеджер" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>

          <TextControl
            label="Должность"
            placeholder="Должность"
            value={postMeta.role}
            onChange={(val) => updateMeta('role', val)}
          />

          <div style={{ height: '24px' }} />
        </PanelBody>

        <PanelBody title="Телефон" initialOpen={false}>
          <p style={{ fontSize: '12px', color: '#757575', marginBottom: '16px' }}>
            Добавьте телефон(ы)
          </p>

          {phoneItems.map((item, index) => (
            <Flex key={index} direction="column" style={{ marginBottom: '8px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <TextControl
                label={`Телефон: ${index + 1}`}
                value={item}
                onChange={(val) => updatePhoneItem(index, val)}
              />
              <Button
                isDestructive
                variant="secondary"
                onClick={() => removePhoneItem(index)}
              >
                Удалить
              </Button>
            </Flex>
          ))}

          <Button
            variant="primary"
            onClick={addPhoneItem}
            style={{ width: '100%' }}
          >
            + Добавить пункт
          </Button>
        </PanelBody>


        <PanelBody title="Email" initialOpen={false}>
          <p style={{ fontSize: '12px', color: '#757575', marginBottom: '16px' }}>
            Добавьте emails
          </p>

          {emailItems.map((item, index) => (
            <Flex key={index} direction="column" style={{ marginBottom: '8px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <TextControl
                label={`Email: ${index + 1}`}
                value={item}
                onChange={(val) => updateEmailItem(index, val)}
              />
              <Button
                isDestructive
                variant="secondary"
                onClick={() => removeEmailItem(index)}
              >
                Удалить
              </Button>
            </Flex>
          ))}

          <Button
            variant="primary"
            onClick={addEmailItem}
            style={{ width: '100%' }}
          >
            + Добавить пункт
          </Button>
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('manager-sidebar', { render: ManagerSidebar });