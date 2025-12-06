import { __ } from '@wordpress/i18n';
import {
  InspectorControls,
  useBlockProps,
  URLInput
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
  TextareaControl,
  Flex, FlexBlock, FlexItem
} from '@wordpress/components';
import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import blockImage from '../../../../admin/assets/img/blocks/block-08.jpg';

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
    isShowMoreButton = true,
    isShowLink = true,
    linkText = '',
    linkURL = '',
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

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
      const loadedTeachers = [];

      for (const teacherId of selectedTeachers) {

        // Берём из кэша
        if (allTeachersMap.has(teacherId)) {
          loadedTeachers.push(allTeachersMap.get(teacherId));
          continue;
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

    fetchSelectedTeachers();
  }, [selectedTeachers]);


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
    if (!teacherId || selectedTeachers.includes(teacherId)) return;

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

      // 1. обновляем selectedTeachers
      setAttributes({
        selectedTeachers: [...selectedTeachers, teacherId],
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
    const newTeachers = [...selectedTeachers];

    newTeachers.splice(index, 1);

    setAttributes({
      selectedTeachers: newTeachers,
    });
  };

  const moveTeacher = (fromIndex, toIndex) => {
    const newSelectedTeachers = [...selectedTeachers];
    const [movedId] = newSelectedTeachers.splice(fromIndex, 1);
    newSelectedTeachers.splice(toIndex, 0, movedId);

    setAttributes({
      selectedTeachers: newSelectedTeachers,
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

  const isShowButton = () => {
    setAttributes({ isShowLink: false });
    setAttributes({ isShowMoreButton: !isShowMoreButton });
  }

  const isLinkButton = () => {
    setAttributes({ isShowMoreButton: false });
    setAttributes({ isShowLink: !isShowLink });
  }

  const blockProps = useBlockProps({
    className: `block-style`,
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Преподаватели', 'theme')} initialOpen={true}>
          <BaseControl>
            <Button
              isPrimary
              onClick={() => setShowTeacherModal(true)}
              style={{ width: '100%' }}
            >
              {__('Добавить преподавателя', 'theme')}
            </Button>

            <div style={{ height: 14 }} />

            <p style={{ fontSize: '12px', color: '#757575' }}>
              {__('Выбрано:', 'theme')} {selectedTeachers.length}
            </p>

            <div style={{ height: 24 }} />

            <ToggleControl
              label={__('Показать кнопку "Показать еще"', 'theme')}
              checked={isShowMoreButton}
              onChange={isShowButton}
            />

            <div style={{ height: 14 }} />

            <ToggleControl
              label={__('Показать кнопку "Ссылку"', 'theme')}
              checked={isShowLink}
              onChange={isLinkButton}
            />

            {isShowLink && (
              <>
                <div style={{ height: 8 }} />

                <TextareaControl
                  value={linkText}
                  onChange={(value) => setAttributes({ linkText: value })}
                  placeholder={__('Текст на кнопке', 'theme')}
                  rows={1}
                />

                <div style={{ height: 8 }} />

                <URLInput
                  className="URLInput"
                  value={linkURL}
                  onChange={(value) => setAttributes({ linkURL: value })}
                  placeholder={__('URL страницы', 'theme')}
                />
              </>
            )}

          </BaseControl>
        </PanelBody>
      </InspectorControls>

      {showTeacherModal && (
        <Modal
          title={__('Добавить преподавателя', 'textdomain')}
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
                label={__('Искать по фамилии / имени', 'textdomain')}
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

            <div style={{
              borderTop: '1px solid #ddd',
              paddingTop: '20px',
              marginTop: '20px'
            }}>
              <TextControl
                label={__('ID преподавателя', 'textdomain')}
                type="number"
                placeholder={__('ID преподавателя', 'textdomain')}
                onKeyDown={handleIdInputKeyDown}
                style={{ marginBottom: '10px' }}
              />
              <p style={{
                fontSize: '12px',
                color: '#757575',
                marginTop: '4px',
                fontStyle: 'italic'
              }}>
                {__('Поиск преподавателя по ID', 'textdomain')}
              </p>
            </div>

            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #ddd',
              textAlign: 'center'
            }}>
              <Button
                onClick={() => {
                  setShowTeacherModal(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
              >
                {__('Закрыть', 'textdomain')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <div className="teachers-block-editor advanced-block">
        <div className="block-info">
          <span className="block-info-title">🎨 Block 08 - Преподаватели</span>
          <ToggleControl
            label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
            checked={isPreview}
            onChange={togglePreview}
          />
        </div>

        {!isPreview && (
          <img src={blockImage} alt="MGUBS" style={{ width: '100%', height: 'inherit', objectFit: 'contain' }} />
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
                  {__('Преподавателя не выбраны', 'textdomain')}
                </p>
                <Button
                  isPrimary
                  onClick={() => setShowTeacherModal(true)}
                  style={{ marginTop: '10px' }}
                >
                  {__('Добавить преподавателя', 'textdomain')}
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
                      height: '200px',
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
                      {teacher.position && (
                        <div className="teacher-position"
                          style={{
                            marginBottom: '10px',
                            fontWeight: '400',
                            fontSize: '11px',
                            textAlign: 'center',
                            color: '#666',
                          }}
                          dangerouslySetInnerHTML={{ __html: teacher.position.replace(/\n/g, '<br/>') }}
                        />
                      )}
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