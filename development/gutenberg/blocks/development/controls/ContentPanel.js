import { PanelBody, TextareaControl, __experimentalInputControl as InputControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ContentPanel = ({ attributes, setAttributes }) => {
  const { supTitle, title, description, button, backgroundColor } = attributes;

  return (
    <PanelBody title={__('Настройки контента', 'theme')} initialOpen={true}>
      <InputControl
        label={__('Текст над заголовком', 'theme')}
        value={supTitle}
        onChange={(value) => setAttributes({ supTitle: value })}
        placeholder={__('Текст...', 'theme')}
      />
      <InputControl
        label={__('Заголовок', 'theme')}
        value={title}
        onChange={(value) => setAttributes({ title: value })}
        placeholder={__('Введите заголовок...', 'theme')}
      />
      <TextareaControl
        label={__('Описание', 'theme')}
        value={description}
        onChange={(value) => setAttributes({ description: value })}
        placeholder={__('Введите описание...', 'theme')}
        rows={4}
      />
      <InputControl
        label={__('Текст кнопки', 'theme')}
        value={button}
        onChange={(value) => setAttributes({ button: value })}
        placeholder={__('Кнопка', 'theme')}
      />
    </PanelBody>
  );
};

export default ContentPanel;
