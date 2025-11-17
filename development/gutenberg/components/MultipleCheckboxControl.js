// components/MultipleCheckboxControl.js (с логикой All)
import { CheckboxControl, BaseControl, Flex, Button } from '@wordpress/components';

const MultipleCheckboxControl = ({
  label = "Образовательные программы",
  value = [],
  options = [],
  onChange
}) => {
  const handleChange = (optionValue, checked) => {
    let newValue;

    if (optionValue === 'all') {
      // Логика для "All"
      newValue = checked ? options.map(opt => opt.value) : [];
    } else {
      // Логика для обычных чекбоксов
      if (checked) {
        newValue = [...value, optionValue];
        // Если выбраны все кроме "all", автоматически выбираем "all"
        if (newValue.length === options.length - 1) {
          newValue = options.map(opt => opt.value);
        }
      } else {
        newValue = value.filter(item => item !== optionValue);
        // Снимаем "all" если сняли любой чекбокс
        newValue = newValue.filter(item => item !== 'all');
      }
    }

    onChange(newValue);
  };

  const isChecked = (optionValue) => {
    return value.includes(optionValue);
  };

  const isIndeterminate = (optionValue) => {
    if (optionValue === 'all') {
      return value.length > 0 && value.length < options.length;
    }
    return false;
  };

  return (
    <BaseControl label={label}>
      <Flex direction="column" gap="4" className={'programs'}>
        {options.map((option) => (
          <CheckboxControl
            key={option.value}
            label={option.label}
            checked={isChecked(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            indeterminate={isIndeterminate(option.value)}
          />
        ))}
      </Flex>
    </BaseControl>
  );
};

export default MultipleCheckboxControl;