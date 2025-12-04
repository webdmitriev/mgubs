import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  Spinner,
  BaseControl,
  SearchControl,
  ToggleControl,
  Modal
} from '@wordpress/components';
import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

// Создаем собственную функцию debounce
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const Edit = ({ attributes, setAttributes }) => {
  const { selectedPosts = [] } = attributes;

  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [allTeachersMap, setAllTeachersMap] = useState(new Map());

  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Используем useRef для хранения debounced функции
  const debouncedSearchRef = useRef(null);

  // Загрузка данных выбранных преподавателей
  useEffect(() => {
    if (selectedPosts.length === 0) {
      setTeachers([]);
      return;
    }

    const fetchselectedPosts = async () => {
      const loadedTeachers = [];

      for (const teacherId of selectedPosts) {

        // Берём из кэша
        if (allTeachersMap.has(teacherId)) {
          loadedTeachers.push(allTeachersMap.get(teacherId));
          continue;
        }

        try {
          const teacher = await apiFetch({
            path: `/wp/v2/pages/${teacherId}?_embed`,
          });

          const teacherData = {
            id: teacher.id,
            name: teacher.title.rendered,
            date_start: teacher.meta?.date_start || '',
            imageUrl: teacher._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            imageId: teacher._embedded?.['wp:featuredmedia']?.[0]?.id || 0,
          };

          // сохраняем в кэш
          setAllTeachersMap(prev => {
            const updated = new Map(prev);
            updated.set(teacherId, teacherData);
            return updated;
          });

          loadedTeachers.push(teacherData);

        } catch (err) {
          console.error('Failed to load teacher:', err);
        }
      }

      setTeachers(loadedTeachers);
    };

    fetchselectedPosts();
  }, [selectedPosts]);


  // Функция поиска преподавателей
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await apiFetch({
        path: `/wp/v2/pages?search=${encodeURIComponent(query)}&per_page=10&_fields=id,title`,
      });

      const options = results
        .filter(teacher => !selectedPosts.includes(teacher.id))
        .map(teacher => ({
          label: teacher.title.rendered,
          value: teacher.id,
          id: teacher.id,
          name: teacher.title.rendered,
        }));

      setSearchResults(options);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [selectedPosts]);

  // Инициализация debounced функции при монтировании
  useEffect(() => {
    debouncedSearchRef.current = debounce(performSearch, 500);
  }, [performSearch]);

  // Выполнение поиска при изменении searchQuery
  useEffect(() => {
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(searchQuery);
    }
  }, [searchQuery]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      // Очищаем таймаут если компонент размонтируется
      if (debouncedSearchRef.current) {
        // Простая очистка - сбрасываем функцию
        debouncedSearchRef.current = null;
      }
    };
  }, []);

  const addTeacher = async (teacherId) => {
    if (!teacherId || selectedPosts.includes(teacherId)) return;

    try {
      const teacher = await apiFetch({
        path: `/wp/v2/pages/${teacherId}?_embed`,
      });

      const teacherData = {
        id: teacher.id,
        name: teacher.title.rendered,
        date_start: teacher.meta?.date_start || '',
        imageUrl: teacher._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        imageId: teacher._embedded?.['wp:featuredmedia']?.[0]?.id || 0,
      };

      // 1. обновляем selectedPosts
      setAttributes({
        selectedPosts: [...selectedPosts, teacherId],
      });

      // 2. обновляем кэш
      setAllTeachersMap(prev => {
        const updated = new Map(prev);
        updated.set(teacherId, teacherData);
        return updated;
      });

      // 3. обновляем локальный массив teachers
      setTeachers(prev => [...prev, teacherData]);

    } catch (err) {
      console.error('Error adding teacher:', err);
    }

    setShowTeacherModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };


  const removeTeacher = (index) => {
    const newTeachers = [...selectedPosts];

    newTeachers.splice(index, 1);

    setAttributes({
      selectedPosts: newTeachers,
    });
  };

  const moveTeacher = (fromIndex, toIndex) => {
    const newselectedPosts = [...selectedPosts];
    const [movedId] = newselectedPosts.splice(fromIndex, 1);
    newselectedPosts.splice(toIndex, 0, movedId);

    setAttributes({
      selectedPosts: newselectedPosts,
    });
  };

  const blockProps = useBlockProps({
    className: `block-style`,
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Курсы', 'theme')} initialOpen={true}>
          <BaseControl>
            <Button
              isPrimary
              onClick={() => setShowTeacherModal(true)}
              style={{ width: '100%' }}
            >
              {__('Добавить курс', 'theme')}
            </Button>

            <div style={{ height: 14 }} />

            <p style={{ fontSize: '12px', color: '#757575' }}>
              {__('Выбрано:', 'theme')} {selectedPosts.length}
            </p>
          </BaseControl>
        </PanelBody>
      </InspectorControls>

      {showTeacherModal && (
        <Modal
          title={__('Добавить курс', 'textdomain')}
          onRequestClose={() => {
            setShowTeacherModal(false);
            setSearchQuery('');
            setSearchResults([]);
          }}
          className="teachers-modal"
          isFullScreen={false}
          style={{ maxWidth: '500px' }}
        >
          <div style={{ padding: '2px' }}>
            <div style={{ marginBottom: '20px' }}>
              <SearchControl
                label={__('Искать названию', 'textdomain')}
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                placeholder={__('Минимум 2 символа...', 'textdomain')}
                className="teacher-search-input"
              />

              {isSearching && (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <Spinner />
                  <p>{__('Поиск...', 'textdomain')}</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div
                  className="teacher-search-results"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    marginTop: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  {searchResults.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="teacher-search-item"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                      }}
                      onClick={() => addTeacher(teacher.id)}
                    >
                      <span>{teacher.name}</span>
                      <span style={{
                        fontSize: '12px',
                        color: '#666',
                        backgroundColor: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '3px'
                      }}>
                        ID: {teacher.id}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#666',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  marginTop: '10px'
                }}>
                  <p>{__('Нет такого...', 'textdomain')}</p>
                </div>
              )}

              {!isSearching && searchQuery.length > 0 && searchQuery.length < 2 && (
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#888',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  marginTop: '10px'
                }}>
                  <p>{__('Type at least 2 characters to search.', 'textdomain')}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      <div className="advanced-block teachers-block-editor teachers-block-editor-courses">
        <div className="block-info">
          <span className="block-info-title">🎨 Block 09</span>
          <ToggleControl
            label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
            checked={isPreview}
            onChange={togglePreview}
          />
        </div>

        {!isPreview && (
          <div>Картинка</div>
        )}

        {isPreview && (
          <div className="teachers-block-grid">
            {teachers.length === 0 ? (
              <div className="empty-state" style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '2px dashed #ddd'
              }}>
                <p className="no-teachers" style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '20px'
                }}>
                  {__('Курсы не выбраны', 'textdomain')}
                </p>
                <Button
                  isPrimary
                  onClick={() => setShowTeacherModal(true)}
                  style={{ marginTop: '10px' }}
                >
                  {__('Добавить курс', 'textdomain')}
                </Button>
              </div>
            ) : (
              teachers.map((teacher, index) => (
                <div
                  key={teacher.id}
                  data-teacher-id={teacher.id}
                  style={{
                    position: 'relative',
                    border: '2px dashed #ccc',
                    padding: '5px 5px 58px 5px',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <div className="teacher-content">
                    <div className="teacher-image" style={{
                      width: '100%',
                      height: '160px',
                      marginBottom: '12px',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      {teacher.imageUrl && (
                        <img
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          data-image-id={teacher.imageId}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) || (
                          <img
                            src='data:image/gif;base64,R0lGODlhBwAFAIAAAP///wAAACH5BAEAAAEALAAAAAAHAAUAAAIFjI+puwUAOw=='
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        )}
                    </div>
                    <div className="teacher-info">
                      <h3 className="teacher-name" style={{
                        margin: '0 0 10px 0',
                        fontSize: '16px',
                        textAlign: 'center',
                      }}>
                        {teacher.name}
                      </h3>
                      <span className="teacher-date" style={{
                        display: 'block',
                        width: '100%',
                        margin: '0 0 8px 0',
                        fontSize: '11px',
                        textAlign: 'center',
                        color: 'rgb(102, 102, 102)',
                      }}>
                        {teacher.date_start ? 'С датой старта' : 'Без даты старта'}
                      </span>
                    </div>
                  </div>
                  <div className="teacher-actions" style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '5px',
                    right: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid #ddd'
                  }}>
                    <div className="teacher-id" style={{
                      fontSize: '12px',
                      color: '#888'
                    }}>
                      <small>ID: {teacher.id}</small>
                    </div>
                    <div className="teacher-buttons" style={{
                      display: 'flex',
                      gap: '5px'
                    }}>
                      {index > 0 && (
                        <Button
                          style={{ padding: 0 }}
                          onClick={() => moveTeacher(index, index - 1)}
                        >{__('⬅️', 'textdomain')}</Button>
                      )}
                      {index < teachers.length - 1 && (
                        <Button
                          style={{ padding: 0 }}
                          onClick={() => moveTeacher(index, index + 1)}
                        >{__('➡️', 'textdomain')}</Button>
                      )}
                      <Button
                        style={{ padding: 0, marginLeft: 10 }}
                        onClick={() => removeTeacher(index)}
                        isDestructive
                      >{__('❌', 'textdomain')}</Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;