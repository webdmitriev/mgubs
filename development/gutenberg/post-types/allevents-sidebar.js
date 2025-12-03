import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import {
  PanelBody, TextareaControl, ToggleControl,
  RangeControl, Flex
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

import colors from '../utils/default-colors.js';
import ColorSelect from '../components/ColorSelect';

import { DateTimeSeparatePicker, DateOnlyPicker } from "../components/DateTimePicker.js";

import programs from '../utils/default-programs.js';
import MultipleCheckboxControl from '../components/MultipleCheckboxControl';

const AllEventsSidebar = () => {
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  if (postType !== 'allevents') return null;

  const postMeta = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('meta') || {},
    []
  );
  const { editPost } = useDispatch('core/editor');

  const updateMeta = (key, value) => {
    editPost({ meta: { ...postMeta, [key]: value } });
  };

  // Преобразуем цвета в нужный формат
  const colorPalette = colors.map(colorObj => ({
    name: colorObj.name,
    color: colorObj.color,
    slug: colorObj.name.toLowerCase().replace(/\s+/g, '-')
  }));

  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="allevents-sidebar" icon="admin-post">Настройки события</PluginSidebarMoreMenuItem>

      <PluginSidebar name="allevents-sidebar" title="Настройки события" icon="admin-post">
        <PanelBody title="Основные поля" initialOpen={true}>
          <ToggleControl
            label="Подключить Jivo chat?"
            checked={!!postMeta.is_jivo_chat}
            onChange={(val) => updateMeta('is_jivo_chat', val)}
          />

          <div style={{ height: '8px' }} />

          <ToggleControl
            label="Набор завершен?"
            checked={!!postMeta.is_done_event}
            onChange={(val) => updateMeta('is_done_event', val)}
          />

          <div style={{ height: '24px' }} />

          <TextareaControl
            label="Краткое описание"
            placeholder="Краткое описание"
            value={postMeta.custom_excerpt || ''}
            onChange={(val) => updateMeta('custom_excerpt', val)}
            rows={8}
          />

          <div style={{ height: '24px' }} />

          <ColorSelect
            label="Цвет фона"
            colors={colorPalette}
            value={postMeta.bgc}
            onChange={(val) => updateMeta('bgc', val)}
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

          <div style={{ height: '24px' }} />

          <DateTimeSeparatePicker
            label="Дата и время события"
            dateValue={postMeta.date_start}
            timeValue={postMeta.date_time}
            onDateChange={(d) => updateMeta('date_start', d)}
            onTimeChange={(t) => updateMeta('date_time', t)}
          />

          <DateOnlyPicker
            label="Дата окончания"
            value={postMeta.date_end}
            onChange={(d) => updateMeta('date_end', d)}
          />

          <div style={{ height: '24px' }} />

          <MultipleCheckboxControl
            label="Образовательные программы"
            value={postMeta.selected_programs || []}
            options={programs}
            onChange={(selected) => updateMeta('selected_programs', selected)}
          />
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

registerPlugin('allevents-sidebar', { render: AllEventsSidebar });