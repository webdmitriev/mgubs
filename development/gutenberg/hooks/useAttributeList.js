import { useCallback } from '@wordpress/element';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { Button, TextControl, TextareaControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export function useAttributeList(attributes, setAttributes, key) {
  const list = attributes[key] || [];

  const setList = useCallback(
    (newList) => setAttributes({ [key]: newList }),
    [key, setAttributes]
  );

  const add = useCallback(
    (itemTemplate = {}) => setList([...list, { ...itemTemplate }]),
    [list, setList]
  );

  const remove = useCallback(
    (index) => setList(list.filter((_, i) => i !== index)),
    [list, setList]
  );

  const update = useCallback(
    (index, field, value) =>
      setList(list.map((item, i) => (i === index ? { ...item, [field]: value } : item))),
    [list, setList]
  );

  const moveUp = useCallback(
    (index) => {
      if (index === 0) return;
      const newList = [...list];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      setList(newList);
    },
    [list, setList]
  );

  const moveDown = useCallback(
    (index) => {
      if (index === list.length - 1) return;
      const newList = [...list];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setList(newList);
    },
    [list, setList]
  );

  // ----------------------------
  // ✍️ Рендер для SelectTextareaControl
  // ----------------------------
  const renderSelectTextareaControl = (item, index) => {
    const imageName = `imageName`;
    const link = `link`;

    return (
      <>
        <SelectControl
          value={item[imageName] || ''}
          options={[
            { label: 'Выберите соцсеть', value: '' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Vk', value: 'vk' },
            { label: 'Youtube', value: 'youtube' },
            { label: 'Whatsapp', value: 'whatsapp' }
          ]}
          onChange={(value) => update(index, imageName, value)}
        />
        <TextareaControl
          placeholder={__('Ссылка...', 'theme')}
          value={item[link]}
          onChange={(value) => update(index, link, value)}
          rows={1}
        />
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для TextareaToTextarea
  // ----------------------------
  const renderTextareaToTextarea = (item, index) => {
    const text = `text`;
    const link = `link`;

    return (
      <>
        <TextareaControl
          placeholder={__('Текст...', 'theme')}
          value={item[text]}
          onChange={(value) => update(index, text, value)}
          rows={5}
        />
        <TextareaControl
          placeholder={__('Ссылка...', 'theme')}
          value={item[link]}
          onChange={(value) => update(index, link, value)}
          rows={1}
        />
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для TextareaToTextarea
  // ----------------------------
  const renderRichTextToRichText = (item, index) => {
    const label = `label`;
    const content = `content`;

    return (
      <>
        <RichText
          placeholder={__('Заголовок', 'theme')}
          value={item[label]}
          onChange={(value) => update(index, label, value)}
        />
        <RichText
          placeholder={__('Телефон и email', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />
      </>
    )
  };

  return { list, add, remove, update, moveUp, moveDown, setList, renderSelectTextareaControl, renderTextareaToTextarea, renderRichTextToRichText };
}