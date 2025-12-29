/*

import PostSelector from '../../components/PostSelector';

// Обновление одного элемента
const updateItem = (index, payload) => {
  const newItems = items.map((item, i) =>
    i === index ? { ...item, ...payload } : item
  );
  setAttributes({ items: newItems });
};

const addItem = () => {
  setAttributes({
    items: [
      ...items,
      {
        pageId: 0,
        title: '',
        excerpt: '',
        image: '',
        metaField: '',
        shadow: '',
        link: '',
        width: 'w-32',
      },
    ],
  });
};

const removeItem = (index) => {
  setAttributes({
    items: items.filter((_, i) => i !== index),
  });
};


{items.map((item, index) => (
  <div
    key={index}
    className={`programs-item ${item.width}`}
  >
  <PostSelector
    label="Выберите страницу"
    postType="manager"
    value={item.pageId}
    metaKeys={[
      'custom_title',
      'custom_excerpt',
      'shadow_image',
    ]}
    onChange={(data) => {
      if (!data) {
        updateItem(index, {
          pageId: 0,
          title: '',
          excerpt: '',
          image: '',
          metaField: '',
          shadow: '',
          link: '',
        });
        return;
      }

      updateItem(index, {
        pageId: data.id,
        title: data.title,
        excerpt: data.excerpt,
        image: data.image,
        metaField:
          data.meta.custom_excerpt || '',
        shadow:
          data.meta.shadow_image || '',
        link: data.link,
      });
    }}
  />
  {
    item.title && (
      <div
        className="page-data-preview"
        style={{
          padding: 12,
          border: '1px solid #ddd',
          margin: '10px 0',
          borderRadius: 4,
        }}
      >
        <div
          className="preview-title"
          dangerouslySetInnerHTML={{
            __html: item.title,
          }}
        />

        {item.image && (
          <img
            src={item.image}
            alt=""
            style={{ display: 'block' }}
          />
        )}

        {item.metaField && (
          <div
            className="preview-descr"
            dangerouslySetInnerHTML={{
              __html: item.metaField,
            }}
          />
        )}
      </div>
    )
  }

      <SelectControl
        label="Ширина блока"
        value={item.width}
        options={[
          { label: 'w-32', value: 'w-32' },
          { label: 'w-50', value: 'w-50' },
          { label: 'w-100', value: 'w-100' },
        ]}
        onChange={(value) =>
          updateItem(index, { width: value })
        }
      />

      <Button
        isDestructive
        onClick={() => removeItem(index)}
      >
        Удалить
      </Button>
    </div >
  ))}

  <Button
    onClick={addItem}
    style={{
      display: 'block',
      margin: '20px auto',
      border: '1px solid rgba(0,124,186,.5)',
    }}
  >
    + Добавить элемент
  </Button>

*/

import apiFetch from '@wordpress/api-fetch';

export const fetchPostData = async ({
  postType,
  postId,
  fields = [],
  metaKeys = [],
}) => {
  if (!postId) return null;

  const post = await apiFetch({
    path: `/wp/v2/${postType}/${postId}?_fields=${fields.join(',')}`,
  });

  let image = '';
  if (post.featured_media) {
    try {
      const media = await apiFetch({
        path: `/wp/v2/media/${post.featured_media}`,
      });
      image = media.source_url;
    } catch { }
  }

  let meta = {};
  if (metaKeys.length) {
    const metaResponse = await apiFetch({
      path: `/wp/v2/${postType}/${postId}?context=edit`,
    });

    metaKeys.forEach(key => {
      meta[key] = metaResponse.meta?.[key] || '';
    });
  }

  return {
    id: post.id,
    title: meta.custom_title || post.title?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    image,
    link: post.link,
    meta,
  };
};
