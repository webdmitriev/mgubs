import { __ } from '@wordpress/i18n';
import {
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  Button,
  Spinner,
  BaseControl,
  SearchControl,
  Modal,
  TextControl,
  Flex, FlexBlock, FlexItem
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
  const {
    selectedTeachers = [],
    teachersData = [],
    columns = 3,
    showImage = true,
    showPosition = true,
    showDescription = true,
  } = attributes;

  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [allTeachersMap, setAllTeachersMap] = useState(new Map());

  // Используем useRef для хранения debounced функции
  const debouncedSearchRef = useRef(null);

  // Загрузка данных выбранных преподавателей
  useEffect(() => {
    if (selectedTeachers.length === 0) {
      setTeachers([]);
      return;
    }

    const fetchSelectedTeachers = async () => {
      const teachersData = await Promise.all(
        selectedTeachers.map(async (teacherId) => {
          // Проверяем, есть ли уже данные в кэше
          if (allTeachersMap.has(teacherId)) {
            return allTeachersMap.get(teacherId);
          }

          try {
            const teacher = await apiFetch({
              path: `/wp/v2/teachers/${teacherId}?_embed`,
            });

            const teacherData = {
              id: teacher.id,
              name: teacher.title.rendered,
              position: teacher.meta?.position || '',
              description: teacher.content?.rendered || '',
              imageUrl: teacher._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
              imageId: teacher._embedded?.['wp:featuredmedia']?.[0]?.id || 0,
            };

            // Сохраняем в кэш
            setAllTeachersMap(prev => new Map(prev).set(teacherId, teacherData));

            return teacherData;
          } catch (error) {
            console.error('Error fetching teacher:', error);
            return null;
          }
        })
      );

      setTeachers(teachersData.filter(Boolean));
    };

    fetchSelectedTeachers();
  }, [selectedTeachers, allTeachersMap]);

  // Функция поиска преподавателей
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await apiFetch({
        path: `/wp/v2/teachers?search=${encodeURIComponent(query)}&per_page=10&_fields=id,title`,
      });

      const options = results
        .filter(teacher => !selectedTeachers.includes(teacher.id))
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
  }, [selectedTeachers]);

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
    if (teacherId && !selectedTeachers.includes(teacherId)) {
      try {
        // Загружаем данные преподавателя
        const teacher = await apiFetch({
          path: `/wp/v2/teachers/${teacherId}?_embed`,
        });

        const teacherData = {
          id: teacher.id,
          name: teacher.title.rendered,
          position: teacher.meta?.position || '',
          description: teacher.content?.rendered || '',
          imageUrl: teacher._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
          imageId: teacher._embedded?.['wp:featuredmedia']?.[0]?.id || 0,
        };

        // Обновляем атрибуты
        setAttributes({
          selectedTeachers: [...selectedTeachers, teacherId],
          teachersData: [...teachersData, teacherData]
        });

      } catch (error) {
        console.error('Error adding teacher:', error);
      }

      setSearchQuery('');
      setSearchResults([]);
      setShowTeacherModal(false);
    }
  };

  const removeTeacher = (index) => {
    const newTeachers = [...selectedTeachers];
    const newTeachersData = [...teachersData];

    newTeachers.splice(index, 1);
    newTeachersData.splice(index, 1);

    setAttributes({
      selectedTeachers: newTeachers,
      teachersData: newTeachersData
    });
  };

  const moveTeacher = (fromIndex, toIndex) => {
    const newTeachers = [...selectedTeachers];
    const [movedTeacher] = newTeachers.splice(fromIndex, 1);
    newTeachers.splice(toIndex, 0, movedTeacher);
    setAttributes({
      selectedTeachers: newTeachers,
    });
  };

  // Загрузка преподавателя по ID
  const loadTeacherById = async (teacherId) => {
    if (!teacherId) return;

    try {
      const teacher = await apiFetch({
        path: `/wp/v2/teachers/${teacherId}?_embed`,
      });

      if (teacher && teacher.id) {
        addTeacher(teacher.id);
      } else {
        alert(__('Teacher not found', 'textdomain'));
      }
    } catch (error) {
      alert(__('Teacher not found or error loading', 'textdomain'));
    }
  };

  const handleIdInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const teacherId = parseInt(e.target.value);
      if (teacherId && !selectedTeachers.includes(teacherId)) {
        loadTeacherById(teacherId);
        e.target.value = '';
      }
    }
  };

  const blockProps = useBlockProps({
    className: `block-style`,
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Layout Settings', 'textdomain')} initialOpen={false}>
          <RangeControl
            label={__('Columns', 'textdomain')}
            value={columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={1}
            max={6}
          />
          <ToggleControl
            label={__('Show Image', 'textdomain')}
            checked={showImage}
            onChange={(value) => setAttributes({ showImage: value })}
          />
          <ToggleControl
            label={__('Show Position', 'textdomain')}
            checked={showPosition}
            onChange={(value) => setAttributes({ showPosition: value })}
          />
          <ToggleControl
            label={__('Show Description', 'textdomain')}
            checked={showDescription}
            onChange={(value) => setAttributes({ showDescription: value })}
          />
        </PanelBody>

        <PanelBody title={__('Teachers', 'textdomain')} initialOpen={true}>
          <BaseControl>
            <div style={{ marginBottom: '16px' }}>
              <Button
                isPrimary
                onClick={() => setShowTeacherModal(true)}
                style={{ width: '100%' }}
              >
                {__('Add Teacher', 'textdomain')}
              </Button>
            </div>

            <p style={{ fontSize: '12px', color: '#757575', marginTop: '8px' }}>
              {__('Selected:', 'textdomain')} {selectedTeachers.length}
            </p>
          </BaseControl>
        </PanelBody>
      </InspectorControls>

      {showTeacherModal && (
        <Modal
          title={__('Add Teacher', 'textdomain')}
          onRequestClose={() => {
            setShowTeacherModal(false);
            setSearchQuery('');
            setSearchResults([]);
          }}
          className="teachers-modal"
          isFullScreen={false}
          style={{ maxWidth: '500px' }}
        >
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <SearchControl
                label={__('Search by name', 'textdomain')}
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                placeholder={__('Type at least 2 characters...', 'textdomain')}
                className="teacher-search-input"
              />

              {isSearching && (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <Spinner />
                  <p>{__('Searching...', 'textdomain')}</p>
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
                  <p>{__('No teachers found for your search.', 'textdomain')}</p>
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

            <div style={{
              borderTop: '1px solid #ddd',
              paddingTop: '20px',
              marginTop: '20px'
            }}>
              <TextControl
                label={__('Or enter teacher ID', 'textdomain')}
                type="number"
                placeholder={__('Enter teacher ID and press Enter', 'textdomain')}
                onKeyDown={handleIdInputKeyDown}
                style={{ marginBottom: '10px' }}
              />
              <p style={{
                fontSize: '12px',
                color: '#757575',
                marginTop: '4px',
                fontStyle: 'italic'
              }}>
                {__('Find teacher ID in WordPress admin under "Teachers"', 'textdomain')}
              </p>
            </div>

            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #ddd',
              textAlign: 'center'
            }}>
              <Button
                isSecondary
                onClick={() => {
                  setShowTeacherModal(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
              >
                {__('Close', 'textdomain')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <div className="teachers-block-editor">
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
                {__('No teachers selected.', 'textdomain')}
              </p>
              <Button
                onClick={() => setShowTeacherModal(true)}
                style={{ marginTop: '10px' }}
              >
                {__('Add First Teacher', 'textdomain')}
              </Button>
            </div>
          ) : (
            teachers.map((teacher, index) => (
              <div
                key={teacher.id}
                data-teacher-id={teacher.id}
                style={{
                  border: '2px dashed #ccc',
                  padding: '5px',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div className="teacher-content">
                  {showImage && teacher.imageUrl && (
                    <div className="teacher-image" style={{
                      width: '100%',
                      height: '200px',
                      marginBottom: '12px',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
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
                    </div>
                  )}
                  <div className="teacher-info">
                    <h3 className="teacher-name" style={{
                      margin: '0 0 10px 0',
                      fontSize: '18px'
                    }}>
                      {teacher.name}
                    </h3>
                    {showPosition && teacher.position && (
                      <div className="teacher-position" style={{
                        marginBottom: '10px',
                        fontWeight: '400',
                        fontSize: '13px',
                        color: '#666',
                      }}>
                        {teacher.position}
                      </div>
                    )}
                    {showDescription && teacher.description && (
                      <div
                        className="teacher-description"
                        dangerouslySetInnerHTML={{ __html: teacher.description }}
                        style={{
                          display: 'none'
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="teacher-actions" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
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
                        onClick={() => moveTeacher(index, index - 1)}
                        icon="dashicons-arrow-right-alt2"
                        label={__('Move right', 'textdomain')}
                      />
                    )}
                    {index < teachers.length - 1 && (
                      <Button
                        onClick={() => moveTeacher(index, index + 1)}
                        icon="dashicons-arrow-left-alt2"
                        label={__('Move left', 'textdomain')}
                        isSmall
                      />
                    )}
                    <Button
                      onClick={() => removeTeacher(index)}
                      icon="trash"
                      label={__('Remove', 'textdomain')}
                      isSmall
                      isDestructive
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;