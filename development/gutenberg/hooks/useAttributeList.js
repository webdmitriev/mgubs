import { useCallback } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload, RichText, URLInput } from '@wordpress/block-editor';
import { Button, TextareaControl, TextControl, SelectControl, ToggleControl, Flex, FlexBlock, RangeControl } from '@wordpress/components';
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
    const { gallery = [] } = item;

    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {gallery.map((img, imgIndex) => (
            <div key={imgIndex} style={{ position: 'relative' }}>
              {img.imageData?.url && (
                <img
                  src={img.imageData.url}
                  alt={img.imageData.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}

              <Button
                isDestructive
                isSmall
                style={{ position: 'absolute', top: 4, right: 4, color: '#fff', backgroundColor: 'rgba(204, 24, 24, 0.6)', border: '1px solid #cc1818' }}
                onClick={() => {
                  const newGallery = gallery.filter((_, i) => i !== imgIndex);
                  updateGallery(index, newGallery);
                }}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>

        <MediaUploadCheck>
          <MediaUpload
            onSelect={(images) => onSelectImage(index, images)}
            allowedTypes={['image']}
            multiple
            gallery
            value={gallery.map(g => g.imageId)}
            render={({ open }) => (
              <Button onClick={open} variant="secondary">
                {__('Добавить изображения', 'theme')}
              </Button>
            )}
          />
        </MediaUploadCheck>
      </div>
    );
  };


  // ----------------------------
  // ✍️ Рендер для blockSeventeen
  // ----------------------------
  const renderBlockNineteen = (item, index) => {
    const image = `image`;
    const name = `name`;
    const role = `role`;
    const content = `content`;

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
                <Button style={{ display: 'block', width: '100%', height: 'inherit', textAlign: 'center' }} onClick={open} variant="primary" size="small">
                  {__('Добавить изображение', 'theme')}
                </Button>
              )}
            </div>
          )}
        />

        <div style={{ height: 12 }} />

        <Flex>
          <FlexBlock>
            <label className="my-rich-text__label">Имя</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст', 'theme')}
              value={item[name]}
              onChange={(value) => update(index, name, value)}
              allowedFormats={[]}
            />
          </FlexBlock>
        </Flex>

        <div style={{ height: 12 }} />

        <Flex>
          <FlexBlock>
            <label className="my-rich-text__label">Роль</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст', 'theme')}
              value={item[role]}
              onChange={(value) => update(index, role, value)}
              allowedFormats={[]}
            />
          </FlexBlock>
        </Flex>

        <div style={{ height: 12 }} />

        <Flex>
          <FlexBlock>
            <label className="my-rich-text__label">Описание</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст', 'theme')}
              value={item[content]}
              onChange={(value) => update(index, content, value)}
            />
          </FlexBlock>
        </Flex>
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для blockTwenty
  // ----------------------------
  const renderBlockTwenty = (item, index) => {
    const title = `title`;
    const sum = `sum`;
    const content = `content`;
    const isButton = 'isButton';

    return (
      <>
        <div style={{ display: 'flex', flex: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', gap: '16px', width: '100%' }}>
          <div style={{ width: '30%' }}>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Заголовок', 'theme')}
              value={item[title]}
              onChange={(value) => update(index, title, value)}
            />
            <TextareaControl
              style={{ textAlign: 'left' }}
              placeholder={__('Число', 'theme')}
              value={item[sum]}
              onChange={(value) => update(index, sum, value)}
              rows={1}
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

        <div style={{ width: '100%' }}>
          <ToggleControl
            label={!item[isButton] ? __('Кнопка убрана ❌', 'theme') : __('Кнопка показано ✅', 'theme')}
            checked={item[isButton]}
            onChange={(value) => update(index, isButton, value)}
          />
        </div>
      </>
    )
  };

  // ----------------------------
  // ✍️ Рендер для TextareaToRichText
  // ----------------------------
  const renderBlockTwentyOne = (item, index) => {
    const title = `title`;
    const content = `content`;

    return (
      <>
        <RichText
          style={{ textAlign: 'left' }}
          placeholder={__('Вопрос', 'theme')}
          value={item[title]}
          onChange={(value) => update(index, title, value)}
        />
        <RichText
          style={{ textAlign: 'left' }}
          placeholder={__('Ответ', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />
      </>
    )
  };


  // ----------------------------
  // ✍️ Рендер для renderBlockTwentyTree
  // ----------------------------
  const renderBlockTwentyTree = (item, index) => {
    const image = `image`;
    const content = `content`;
    const contacts = `contacts`;

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

        <RichText
          style={{ textAlign: 'left' }}
          placeholder={__('Имя и роль', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />

        <RichText
          style={{ textAlign: 'left' }}
          placeholder={__('Контакты', 'theme')}
          value={item[contacts]}
          onChange={(value) => update(index, contacts, value)}
        />
      </>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockTwentyFine
  // -----------------------------------
  const renderBlockTwentyFine = (item, index) => {
    const image = `image`;
    const title = `title`;
    const subTitle = `subTitle`;
    const content = `content`;
    const link = `link`;

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

        <>
          <label className="my-rich-text__label">Заголовок</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[title]}
            onChange={(value) => update(index, title, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Подзаголовок</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[subTitle]}
            onChange={(value) => update(index, subTitle, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Описание</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[content]}
            onChange={(value) => update(index, content, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Ссылка</label>
          <URLInput
            placeholder={__('Введите название страницы или url', 'theme')}
            value={item[link]}
            onChange={(value) => update(index, link, value)}
          />
        </>
      </>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockNews
  // -----------------------------------
  const renderBlockNews = (item, index) => {
    const image = `image`;
    const content = `content`;
    const link = `link`;
    const date = `date`;

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

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Описание</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[content]}
            onChange={(value) => update(index, content, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Ссылка</label>
          <URLInput
            placeholder={__('Введите название страницы или url', 'theme')}
            value={item[link]}
            onChange={(value) => update(index, link, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Дата:</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('31 Декабря 2025', 'theme')}
            value={item[date]}
            onChange={(value) => update(index, date, value)}
          />
        </>
      </>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockTwentyNine
  // -----------------------------------
  const renderBlockTwentyNine = (item, index) => {
    const image = `image`;
    const label = `label`;
    const content = `content`;
    const link = `link`;

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

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Лейбл</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[label]}
            onChange={(value) => update(index, label, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Описание</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[content]}
            onChange={(value) => update(index, content, value)}
          />
        </>

        <div style={{ height: '8px' }} />

        <>
          <label className="my-rich-text__label">Ссылка</label>
          <URLInput
            placeholder={__('Введите название страницы или url', 'theme')}
            value={item[link]}
            onChange={(value) => update(index, link, value)}
          />
        </>
      </>
    )
  };


  // -------------------------------
  // ✍️ Рендер для renderBlockThirty
  // -------------------------------
  const renderBlockThirty = (item, index) => {
    const content = `content`;

    return (
      <>
        <RichText
          style={{ textAlign: 'left' }}
          placeholder={__('Текст...', 'theme')}
          value={item[content]}
          onChange={(value) => update(index, content, value)}
        />
      </>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockThirtyTwo
  // -----------------------------------
  const renderBlockThirtyTwo = (item, index) => {
    const image = `image`;
    const shadow = `shadow`;
    const link = `link`;

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

        <div style={{ height: '8px' }} />
        <Flex>
          <FlexBlock>
            <label className="my-rich-text__label">Rutube</label>
            <TextControl
              placeholder={__('c08e1819ea06326802310c2f2dbf40ca...', 'theme')}
              value={item[link]}
              onChange={(value) => update(index, link, value)}
            />
          </FlexBlock>
        </Flex>
        <div style={{ height: '8px' }} />

        <Flex direction="column" gap="8">
          <FlexBlock>
            <RangeControl
              label={
                <div>Затемнение картинки (0-10): <strong style={{ paddingBlock: '2px', paddingInline: '4px', color: '#fff', backgroundColor: '#000' }}>{item[shadow] || 0}</strong></div>
              }
              value={item[shadow] || 0}
              onChange={(val) => update(index, shadow, val)}
              min={0}
              max={9}
              step={1}
              withInputField={false}
            />
          </FlexBlock>
        </Flex>
      </>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockThirtyFour
  // -----------------------------------
  const renderBlockThirtyFour = (item, index) => {
    const image = `image`;
    const label = `label`;
    const content = `content`;

    return (
      <Flex align="flex-start" gap="12">
        <FlexBlock>
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
                        aspectRatio: '1 / 1',
                        width: '100%',
                        height: 'inherit',
                        objectFit: 'contain',
                      }}
                    />
                    <div className="repeater-image-controls" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                      <Button onClick={open} variant="secondary" size="small">
                        ✍️ {__(' ', 'theme')}
                      </Button>
                      <Button
                        isDestructive
                        onClick={() => update(index, image, { id: 0, url: '', alt: '' })}
                        variant="secondary"
                        size="small"
                      >
                        ❌ {__(' ', 'theme')}
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
        </FlexBlock>
        <FlexBlock>
          <>
            <label className="my-rich-text__label">Лейбл</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст', 'theme')}
              value={item[label]}
              onChange={(value) => update(index, label, value)}
            />
          </>

          <>
            <label className="my-rich-text__label">Описание</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст', 'theme')}
              value={item[content]}
              onChange={(value) => update(index, content, value)}
            />
          </>
        </FlexBlock>
      </Flex>
    )
  };


  // -----------------------------------
  // ✍️ Рендер для renderBlockThirtySix
  // -----------------------------------
  const renderBlockThirtySix = (item, index) => {
    const image = `image`;
    const label = `label`;

    return (
      <Flex align="flex-start" gap="8">
        <div style={{ display: 'block', width: '80px' }}>
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
                        aspectRatio: '1 / 1',
                        width: '100%',
                        height: 'inherit',
                        objectFit: 'contain',
                      }}
                    />
                    <div className="repeater-image-controls" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                      <Button onClick={open} variant="secondary" size="small">
                        ✍️ {__(' ', 'theme')}
                      </Button>
                      <Button
                        isDestructive
                        onClick={() => update(index, image, { id: 0, url: '', alt: '' })}
                        variant="secondary"
                        size="small"
                      >
                        ❌ {__(' ', 'theme')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={open} variant="primary" size="small">
                    {__('Иконка', 'theme')}
                  </Button>
                )}
              </div>
            )}
          />
        </div>
        <FlexBlock>
          <label className="my-rich-text__label">Текст</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[label]}
            onChange={(value) => update(index, label, value)}
          />
        </FlexBlock>
      </Flex>
    )
  };


  // ----------------------------------------
  // ✍️ Рендер для renderBlockThirtySixSecond
  // ----------------------------------------
  const renderBlockThirtySixSecond = (item, index) => {
    const image = `image`;
    const label = `label`;

    return (
      <Flex align="flex-start" gap="8">
        <div style={{ display: 'block', width: '80px' }}>
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
                        aspectRatio: '1 / 1',
                        width: '100%',
                        height: 'inherit',
                        objectFit: 'contain',
                      }}
                    />
                    <div className="repeater-image-controls" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                      <Button onClick={open} variant="secondary" size="small">
                        ✍️ {__(' ', 'theme')}
                      </Button>
                      <Button
                        isDestructive
                        onClick={() => update(index, image, { id: 0, url: '', alt: '' })}
                        variant="secondary"
                        size="small"
                      >
                        ❌ {__(' ', 'theme')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={open} variant="primary" size="small">
                    {__('Иконка', 'theme')}
                  </Button>
                )}
              </div>
            )}
          />
        </div>
        <FlexBlock>
          <label className="my-rich-text__label">Текст</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[label]}
            onChange={(value) => update(index, label, value)}
          />
        </FlexBlock>
      </Flex>
    )
  };


  // ----------------------------------------
  // ✍️ Рендер для renderBlockThirtySixThird
  // ----------------------------------------
  const renderBlockThirtySixThird = (item, index) => {
    const num = `num`;
    const label = `label`;

    return (
      <Flex align="flex-start" gap="8">
        <div style={{ display: 'block', width: 120 }}>
          <label className="my-rich-text__label">Номер</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Номер', 'theme')}
            value={item[num]}
            onChange={(value) => update(index, num, value)}
          />
        </div>
        <FlexBlock>
          <label className="my-rich-text__label">Текст</label>
          <RichText
            style={{ textAlign: 'left' }}
            placeholder={__('Текст', 'theme')}
            value={item[label]}
            onChange={(value) => update(index, label, value)}
          />
        </FlexBlock>
      </Flex>
    )
  };


  // ------------------------------------
  // ✍️ Рендер для renderBlockThirtySeven
  // ------------------------------------
  const renderBlockThirtySeven = (item, index) => {
    const title = `title`;
    const descr = `descr`;

    return (
      <>
        <Flex>
          <FlexBlock>
            <label className="my-rich-text__label">Заголовок</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст...', 'theme')}
              value={item[title]}
              onChange={(value) => update(index, title, value)}
            />
          </FlexBlock>
        </Flex>
        <Flex>
          <FlexBlock>
            <div style={{ height: 24 }} />
            <label className="my-rich-text__label">Описание</label>
            <RichText
              style={{ textAlign: 'left' }}
              placeholder={__('Текст...', 'theme')}
              value={item[descr]}
              onChange={(value) => update(index, descr, value)}
            />
          </FlexBlock>
        </Flex>
      </>
    )
  };

  return {
    list, add, remove, update, moveUp, moveDown, setList,
    renderSelectTextareaControl, renderTextareaToTextarea,
    renderRichTextToRichText, renderBreadcrumbs, renderBlockFourteen,
    renderTextareaToRichText, renderTextRichToRich, renderBlockSeventeen,
    renderBlockNineteen, renderBlockTwenty, renderBlockTwentyOne, renderBlockTwentyTree,
    renderBlockTwentyFine, renderBlockNews, renderBlockTwentyNine, renderBlockThirty,
    renderBlockThirtyTwo, renderBlockThirtyFour, renderBlockThirtySix, renderBlockThirtySixSecond, renderBlockThirtySixThird,
    renderBlockThirtySeven
  };
}