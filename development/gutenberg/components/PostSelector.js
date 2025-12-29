import { SelectControl, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { usePostList } from '../hooks/usePostList';
import { fetchPostData } from '../hooks/usePostData';

const PostSelector = ({
  label = 'Выберите запись',
  postType = 'pages',
  value,
  onChange,
  fields = ['id', 'title', 'excerpt', 'featured_media', 'link'],
  metaKeys = [],
}) => {
  const { items, loading } = usePostList({ postType });
  const [loadingItem, setLoadingItem] = useState(false);

  const options = [
    { label: '— Не выбрано —', value: '' },
    ...items.map(item => ({
      label: item.title.rendered,
      value: item.id.toString(),
    })),
  ];

  const handleSelect = async (postId) => {
    if (!postId) {
      onChange(null);
      return;
    }

    setLoadingItem(true);
    const data = await fetchPostData({
      postType,
      postId,
      fields,
      metaKeys,
    });
    setLoadingItem(false);
    onChange(data);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SelectControl
        label={label}
        value={value ? value.toString() : ''}
        options={options}
        onChange={handleSelect}
        disabled={loading}
      />
      {loadingItem && (
        <div style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
        }}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PostSelector;
