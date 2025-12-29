import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Универсальный хук для выбора post_type
 */
export const usePostTypeSelector = ({
  postType,
  selectedIds = [],
  perPage = 99,
  mapItem,
  embed = true,
}) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const cacheRef = useRef(new Map());
  const debounceRef = useRef(null);

  /** debounce */
  const debounce = (fn, delay) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  /** загрузка выбранных */
  useEffect(() => {
    if (!selectedIds.length) {
      setItems([]);
      return;
    }

    const load = async () => {
      const loaded = [];

      for (const id of selectedIds) {
        if (cacheRef.current.has(id)) {
          loaded.push(cacheRef.current.get(id));
          continue;
        }

        const data = await apiFetch({
          path: `/wp/v2/${postType}/${id}${embed ? '?_embed' : ''}`,
        });

        const mapped = mapItem(data);
        cacheRef.current.set(id, mapped);
        loaded.push(mapped);
      }

      setItems(loaded);
    };

    load();
  }, [selectedIds]);

  /** поиск */
  const search = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const results = await apiFetch({
      path: `/wp/v2/${postType}?search=${encodeURIComponent(query)}&per_page=${perPage}&_fields=id,title`,
    });

    setSearchResults(
      results
        .filter(item => !selectedIds.includes(item.id))
        .map(item => ({
          id: item.id,
          label: item.title.rendered,
        }))
    );

    setIsSearching(false);
  }, [postType, selectedIds]);

  useEffect(() => {
    debounceRef.current = debounce(search, 500);
  }, [search]);

  useEffect(() => {
    debounceRef.current?.(searchQuery);
  }, [searchQuery]);

  return {
    items,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    cacheRef,
  };
};
