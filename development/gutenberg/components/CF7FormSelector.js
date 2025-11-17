import { SelectControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const CF7FormSelector = ({ attributes, setAttributes }) => {
  const { cf7FormId } = attributes;

  const { forms, isLoading } = useSelect((select) => {
    const formsData = select('core').getEntityRecords('postType', 'wpcf7_contact_form', {
      per_page: -1,
      status: 'publish'
    });

    return {
      forms: formsData,
      isLoading: !formsData
    };
  }, []);

  // Формируем опции
  const formOptions = forms ? forms.map(form => ({
    label: form.title.rendered,
    value: form.id
  })) : [];

  formOptions.unshift({
    label: __('-- Выберите форму --', 'theme'),
    value: ''
  });

  if (isLoading) {
    return (
      <div>
        <div style={{ marginBottom: '8px' }}>{__('Загрузка форм...', 'theme')}</div>
        <Spinner />
      </div>
    );
  }

  return (
    <SelectControl
      label={__('Контактная форма CF7', 'theme')}
      value={cf7FormId}
      options={formOptions}
      onChange={(formId) => {
        const selectedForm = forms.find(form => form.id === parseInt(formId));
        const shortcode = selectedForm ?
          `[contact-form-7 id="${selectedForm.id}" title="${selectedForm.title.rendered}"]` : '';

        setAttributes({
          cf7FormId: formId,
          cf7Shortcode: shortcode
        });
      }}
      help={cf7FormId ? __('Форма выбрана', 'theme') : __('Выберите форму из списка', 'theme')}
    />
  );
};

export default CF7FormSelector;