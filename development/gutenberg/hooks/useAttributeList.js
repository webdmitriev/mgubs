import { useCallback } from '@wordpress/element';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { Button, TextareaControl, SelectControl } from '@wordpress/components';
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

  // ----------------------------
  // ✍️ Рендер для breadcrumbs
  // ----------------------------
  const renderBreadcrumbs = (item, index) => {
    const text = `text`;
    const hash = `hash`;

    return (
      <>
        <TextareaControl
          placeholder={__('Текст...', 'theme')}
          value={item[text]}
          onChange={(value) => update(index, text, value)}
          rows={1}
        />
        <TextareaControl
          placeholder={__('Хештег', 'theme')}
          value={item[hash]}
          onChange={(value) => update(index, hash, value)}
          rows={1}
        />
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для blockFourteen
  // ----------------------------
  const renderBlockFourteen = (item, index) => {
    const image = `image`;
    const content = `content`;

    return (
      <>
        <MediaUpload
          onSelect={(media) =>
            update(index, image, {
              id: media.id,
              url: media.url,
              alt: media.alt || '',
            })
          }
          allowedTypes={['image']}
          value={item[image]?.id}
          render={({ open }) => (
            <div className="repeater-image" style={{ display: 'block', width: '100%' }}>
              {item[image]?.url ? (
                <div className="repeater-image-preview">
                  <img
                    src={item[image].url}
                    alt={item[image].alt || ''}
                    style={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'inherit',
                      marginBottom: '8px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                    }}
                  />
                  <div className="repeater-image-controls" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                    <Button onClick={open} variant="secondary" size="small">
                      ✍️ {__('Заменить', 'theme')}
                    </Button>
                    <Button
                      isDestructive
                      onClick={() => update(index, image, { id: 0, url: '', alt: '' })}
                      variant="secondary"
                      size="small"
                    >
                      ❌ {__('Удалить', 'theme')}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={open} variant="primary" size="small">
                  {__('Добавить изображение', 'theme')}
                </Button>
              )}
            </div>
          )}
        />
        <RichText
          style={{ textAlign: 'left' }}
          tagName="div"
          placeholder={__('Описание...', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для TextareaToRichText
  // ----------------------------
  const renderTextareaToRichText = (item, index) => {
    const title = `title`;
    const content = `content`;

    return (
      <>
        <TextareaControl
          placeholder={__('Число', 'theme')}
          value={item[title]}
          onChange={(value) => update(index, title, value)}
          rows={1}
        />
        <RichText
          placeholder={__('Описание', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для TextRichToRich
  // ----------------------------
  const renderTextRichToRich = (item, index) => {
    const num = `num`;
    const title = `title`;
    const content = `content`;

    return (
      <div style={{ display: 'flex', flex: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', gap: '16px', width: '100%' }}>
        <div style={{ width: '30%' }}>
          <TextareaControl
            style={{ textAlign: 'left' }}
            placeholder={__('Число', 'theme')}
            value={item[num]}
            onChange={(value) => update(index, num, value)}
            rows={1}
          />
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Заголовок', 'theme')}
            value={item[title]}
            onChange={(value) => update(index, title, value)}
          />
        </div>

        <div style={{
          width: 'calc(70% - 18px)',
          textAlign: 'left',
          minHeight: '100px'
        }}>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Описание', 'theme')}
            value={item[content]}
            onChange={(value) => update(index, content, value)}
          />
        </div>
      </div>
    )
  };

  // ----------------------------
  // ✍️ Рендер для blockSeventeen
  // ----------------------------
  const renderBlockSeventeen = (item, index) => {
    const image = `image`;

    return (
      <>
        <MediaUpload
          onSelect={(media) =>
            update(index, image, {
              url: media.url,
              alt: media.alt || '',
              responsive: media.responsive || {
                webp: '',
                jpg: '',
                default: media.url,
              }
            })
          }
          allowedTypes={['image']}
          value={item[image]?.id}
          render={({ open }) => (
            <div className="repeater-image" style={{ display: 'block', width: '100%' }}>
              {item[image]?.url ? (
                <div className="repeater-image-preview">
                  <img
                    src={item[image].url}
                    alt={item[image].alt || ''}
                    style={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'inherit',
                      marginBottom: '8px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                    }}
                  />
                  <div className="repeater-image-controls" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                    <Button onClick={open} variant="secondary" size="small">
                      ✍️ {__('Заменить', 'theme')}
                    </Button>
                    <Button
                      isDestructive
                      onClick={() => update(index, image, { id: 0, url: '', alt: '' })}
                      variant="secondary"
                      size="small"
                    >
                      ❌ {__('Удалить', 'theme')}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={open} variant="primary" size="small">
                  {__('Добавить изображение', 'theme')}
                </Button>
              )}
            </div>
          )}
        />
      </>
    )
  };

  return {
    list, add, remove, update, moveUp, moveDown, setList,
    renderSelectTextareaControl, renderTextareaToTextarea,
    renderRichTextToRichText, renderBreadcrumbs, renderBlockFourteen,
    renderTextareaToRichText, renderTextRichToRich, renderBlockSeventeen
  };
}