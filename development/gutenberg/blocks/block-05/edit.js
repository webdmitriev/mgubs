import { useState } from '@wordpress/element';
import {
  useBlockProps,
  URLInput,
  InspectorControls
} from '@wordpress/block-editor';
import { Button, SelectControl, TextControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const Edit = ({ attributes, setAttributes }) => {
  const { programs } = attributes;

  const updateItem = (index, key, value) => {
    const newItems = programs.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setAttributes({ programs: newItems });
  };

  // Загрузка страницы по ID
  const fetchPageData = async (index, { url, postId }) => {
    updateItem(index, "url", url);
    updateItem(index, "pageId", postId);

    if (!postId) return;

    // 1. Загружаем страницу
    const page = await apiFetch({ path: `/wp/v2/pages/${postId}` });

    updateItem(index, "title", page.title?.rendered || "");
    updateItem(index, "excerpt", page.meta?.custom_excerpt || "");

    // 2. Загружаем картинку, если есть
    if (page.featured_media) {
      const media = await apiFetch({ path: `/wp/v2/media/${page.featured_media}` });
      updateItem(index, "image", media.source_url);
    }
  };

  const addItem = () => {
    setAttributes({
      programs: [
        ...programs,
        {
          url: '',
          pageId: 0,
          title: '',
          excerpt: '',
          image: '',
          width: 'w-32',
        }
      ]
    });
  };

  const removeItem = (index) => {
    setAttributes({
      programs: programs.filter((_, i) => i !== index)
    });
  };

  const blockProps = useBlockProps({
    className: "block-style",
  });

  return (
    <div {...blockProps}>
      <div className="advanced-block-content">
        {programs.map((item, index) => (
          <div key={index} className="repeater-item">

            {/* URLInput теперь отдаёт объект: { url, postId } */}
            <URLInput
              label="Выберите страницу"
              value={item.url}
              onChange={(value) => fetchPageData(index, value)}
            />

            <SelectControl
              label="Ширина блока"
              value={item.width}
              options={[
                { label: 'w-32', value: 'w-32' },
                { label: 'w-50', value: 'w-50' },
                { label: 'w-100', value: 'w-100' }
              ]}
              onChange={(value) => updateItem(index, 'width', value)}
            />

            {item.image && (
              <img
                src={item.image}
                style={{ width: "120px", marginTop: "10px" }}
                alt=""
              />
            )}

            <TextControl
              label="Заголовок (редактируемый)"
              value={item.title}
              onChange={(value) => updateItem(index, "title", value)}
            />

            <TextControl
              label="Описание"
              value={item.excerpt}
              onChange={(value) => updateItem(index, "excerpt", value)}
            />

            <Button
              isDestructive
              onClick={() => removeItem(index)}
            >
              Удалить
            </Button>
          </div>
        ))}

        <Button onClick={addItem}>
          + Добавить элемент
        </Button>
      </div>
    </div>
  );
};

export default Edit;
