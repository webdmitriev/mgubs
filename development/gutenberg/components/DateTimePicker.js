import {
  DatePicker,
  Dropdown,
  Button,
  BaseControl,
  SelectControl
} from '@wordpress/components';
import { calendar, schedule } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import { format } from '@wordpress/date';

// Генерируем массив времени: 08:00, 08:15, 08:30, ..., 22:00
const generateTimeOptions = () => {
  const options = [];
  for (let h = 8; h <= 22; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      const value = `${hour}:${minute}`;
      options.push({ label: value, value });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions(); // 60 вариантов

// 1. Только дата — оставляем как есть (работает идеально)
export const DateOnlyPicker = ({ label, value, onChange, placeholder = 'Выбрать дату' }) => {
  const display = value ? format('d.m.Y', value) : placeholder;

  return (
    <BaseControl label={label}>
      <Dropdown
        position="bottom left"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            variant="secondary"
            icon={calendar}
            onClick={onToggle}
            aria-expanded={isOpen}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            {display}
          </Button>
        )}
        renderContent={({ onClose }) => (
          <div style={{ padding: 16, background: '#fff' }}>
            <DatePicker
              currentDate={value || new Date()}
              onChange={(newDate) => {
                onChange(format('Y-m-d', newDate));
                onClose();
              }}
            />
          </div>
        )}
      />
    </BaseControl>
  );
};

// 2. Дата + Время — теперь с SelectControl (никаких багов!)
export const DateTimeSeparatePicker = ({
  label,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
}) => {
  // Приводим значение к валидному, если оно кривое или пустое
  const normalizedTime = timeValue && /^\d{2}:\d{2}$/.test(timeValue) ? timeValue : '12:00';

  const displayDate = dateValue ? format('d.m.Y', dateValue) : 'дд.мм.гггг';
  const displayTime = normalizedTime;

  return (
    <BaseControl label={label}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {/* Дата — через Dropdown */}
        <Dropdown
          position="bottom left"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              variant="secondary"
              icon={calendar}
              onClick={onToggle}
              aria-expanded={isOpen}
              style={{ justifyContent: 'flex-start' }}
            >
              {displayDate}
            </Button>
          )}
          renderContent={({ onClose }) => (
            <div style={{ padding: 16, background: '#fff' }}>
              <DatePicker
                currentDate={dateValue || new Date()}
                onChange={(d) => {
                  onDateChange(format('Y-m-d', d));
                  onClose();
                }}
              />
            </div>
          )}
        />

        {/* Время — через SelectControl */}
        <SelectControl
          value={normalizedTime}
          options={[
            { label: 'чч:мм', value: '' },
            ...timeOptions,
          ]}
          onChange={(newTime) => {
            if (newTime) onTimeChange(newTime);
          }}
          __nextHasNoMarginBottom // для WP 6.5+
        />
      </div>
    </BaseControl>
  );
};