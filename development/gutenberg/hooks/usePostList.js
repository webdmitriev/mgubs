import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export const usePostList = ({ postType, perPage = 100 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await apiFetch({
          path: `/wp/v2/${postType}?per_page=${perPage}&status=publish`,
        });
        if (isMounted) setItems(data);
      } catch (e) {
        console.error(`Ошибка загрузки ${postType}`, e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();
    return () => (isMounted = false);
  }, [postType, perPage]);

  return { items, loading };
};
