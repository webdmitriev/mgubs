import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, Spinner, Notice, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { teachers: selectedTeacherIds, teachersOrder = [] } = attributes;
  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Загружаем всех преподавателей с обработкой состояний
  const { teachersPosts, isLoading, hasError } = useSelect((select) => {
    const query = {
      per_page: -1,
      _fields: 'id,title,status,slug,meta,featured_media',
      status: ['publish']
    };

    try {
      const posts = select('core').getEntityRecords('postType', 'teachers', query);
      const resolving = select('core').isResolving('getEntityRecords', ['postType', 'teachers', query]);
      const hasResolved = select('core').hasFinishedResolution('getEntityRecords', ['postType', 'teachers', query]);

      return {
        teachersPosts: posts,
        isLoading: resolving && !hasResolved,
        hasError: !resolving && !hasResolved && !posts,
        isResolved: hasResolved
      };
    } catch (error) {
      return {
        teachersPosts: null,
        isLoading: false,
        hasError: true,
        errorMessage: error.message
      };
    }
  }, []);

  // Добавляем искусственную задержку для демонстрации
  const [showLoading, setShowLoading] = useState(true);
  useState(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Обработчик выбора преподавателя
  const handleTeacherSelect = (teacherId) => {
    const newSelectedTeachers = selectedTeacherIds || [];
    let newTeachersOrder = teachersOrder || [];

    if (newSelectedTeachers.includes(teacherId)) {
      // Удаляем если уже выбран
      const updatedTeachers = newSelectedTeachers.filter(id => id !== teacherId);
      const updatedOrder = newTeachersOrder.filter(id => id !== teacherId);

      setAttributes({
        teachers: updatedTeachers,
        teachersOrder: updatedOrder
      });
    } else {
      // Добавляем если не выбран
      const updatedTeachers = [...newSelectedTeachers, teacherId];
      const updatedOrder = [...newTeachersOrder, teacherId];

      setAttributes({
        teachers: updatedTeachers,
        teachersOrder: updatedOrder
      });
    }
  };

  // Очистка выбора
  const clearSelection = () => {
    setAttributes({
      teachers: [],
      teachersOrder: []
    });
  };

  // Получаем выбранных преподавателей в правильном порядке
  const selectedTeachers = (teachersPosts?.filter(teacher =>
    selectedTeacherIds?.includes(teacher.id)
  ) || []).sort((a, b) => {
    const orderA = teachersOrder?.indexOf(a.id) ?? selectedTeacherIds?.indexOf(a.id) ?? -1;
    const orderB = teachersOrder?.indexOf(b.id) ?? selectedTeacherIds?.indexOf(b.id) ?? -1;
    return orderA - orderB;
  });

  // Функции для перестановки карточек
  const moveTeacher = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    const newOrder = [...teachersOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    setAttributes({ teachersOrder: newOrder });
  };

  const moveTeacherUp = (currentIndex) => {
    if (currentIndex === 0) return;
    moveTeacher(currentIndex, currentIndex - 1);
  };

  const moveTeacherDown = (currentIndex) => {
    if (currentIndex === teachersOrder.length - 1) return;
    moveTeacher(currentIndex, currentIndex + 1);
  };

  const moveTeacherToStart = (currentIndex) => {
    if (currentIndex === 0) return;
    moveTeacher(currentIndex, 0);
  };

  const moveTeacherToEnd = (currentIndex) => {
    if (currentIndex === teachersOrder.length - 1) return;
    moveTeacher(currentIndex, teachersOrder.length - 1);
  };

  // Получаем текущий индекс в teachersOrder для карточки
  const getCurrentOrderIndex = (teacherId) => {
    return teachersOrder.indexOf(teacherId);
  };

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  // Отображаем состояние загрузки
  if (showLoading || isLoading) {
    return (
      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-loading">
            <Spinner />
            <p>{__('Загружаем данные преподавателей...', 'theme')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Отображаем ошибку
  if (hasError) {
    return (
      <div {...blockProps}>
        <div className="advanced-block">
          <Notice status="error" isDismissible={false}>
            {__('Ошибка при загрузке данных преподавателей. Пожалуйста, проверьте наличие типа записи "teachers".', 'theme')}
          </Notice>
        </div>
      </div>
    );
  }

  // Проверяем наличие данных
  if (!teachersPosts || teachersPosts.length === 0) {
    return (
      <div {...blockProps}>
        <div className="advanced-block">
          <Notice status="warning" isDismissible={false}>
            {__('Преподаватели не найдены. Создайте записи типа "teachers".', 'theme')}
          </Notice>
        </div>
      </div>
    );
  }

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />

        {/* Панель выбора преподавателя */}
        <PanelBody title={__('Выбор преподавателя', 'theme')} initialOpen={true}>
          {/* Множественный выбор через чекбоксы */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
              {teachersPosts.map((teacher) => (
                <div key={teacher.id} style={{ marginBottom: '8px' }}>
                  <ToggleControl
                    label={teacher.title?.rendered || __('Без названия', 'theme')}
                    checked={selectedTeacherIds?.includes(teacher.id) || false}
                    onChange={() => handleTeacherSelect(teacher.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button
              variant="secondary"
              onClick={clearSelection}
              disabled={!selectedTeacherIds || selectedTeacherIds.length === 0}
            >
              {__('Очистить выбор', 'theme')}
            </Button>
          </div>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 08 - Преподаватели</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <div className="preview-mode">
              <h4>{__('Режим предпросмотра:', 'theme')}</h4>
              <p>{__('Здесь будет отображаться выбранный преподаватель(и) как на фронтенде.', 'theme')}</p>
            </div>
          )}

          {isPreview && (
            <div className="advanced-block-content">
              {/* Отображение выбранных преподавателей */}
              <div className="selected-teachers">
                {selectedTeachers.length === 0 ? (
                  <Notice status="warning" isDismissible={false}>
                    {__('Преподаватели не выбраны. Выберите преподавателя в панели настроек.', 'theme')}
                  </Notice>
                ) : (
                  <>
                    {/* Панель управления порядком */}
                    <div className="order-controls" style={{ marginBottom: '20px', padding: '10px', background: '#f6f7f7', borderRadius: '4px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>
                        {__('Порядок отображения преподавателей:', 'theme')}
                      </h4>
                      <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
                        {__('Используйте кнопки для изменения порядка карточек', 'theme')}
                      </p>
                      <div style={{ fontSize: '12px', color: '#007cba' }}>
                        {__('Текущий порядок:', 'theme')} [{teachersOrder.join(', ')}]
                      </div>
                    </div>

                    <div className="teachers-grid">
                      {selectedTeachers.map((teacher, displayIndex) => {
                        const currentOrderIndex = getCurrentOrderIndex(teacher.id);

                        return (
                          <div key={teacher.id} className="teacher-card">
                            <div className="teacher-card__header">
                              <div className="teacher-card__title">
                                {teacher.title?.rendered || __('Без названия', 'theme')}
                                <span className="teacher-card__position" style={{ fontSize: '12px', color: '#666', display: 'block' }}>
                                  {__('Позиция:', 'theme')} {displayIndex + 1}
                                  {__(' (в порядке:', 'theme')} {currentOrderIndex + 1})
                                </span>
                              </div>
                            </div>
                            <div className="teacher-card__meta">
                              <span className="teacher-card__id">
                                ID: {teacher.id}
                              </span>
                              <br />
                              <span className="teacher-card__slug">
                                Slug: {teacher.slug}
                              </span>
                            </div>

                            {/* Кнопки управления порядком */}
                            <div className="teacher-card__controls" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                              <Button
                                variant="secondary"
                                size="small"
                                onClick={() => moveTeacherToStart(currentOrderIndex)}
                                disabled={currentOrderIndex === 0}
                              >
                                {__('В начало', 'theme')}
                              </Button>
                              <Button
                                variant="secondary"
                                size="small"
                                onClick={() => moveTeacherUp(currentOrderIndex)}
                                disabled={currentOrderIndex === 0}
                              >
                                {__('Вверх', 'theme')}
                              </Button>
                              <Button
                                variant="secondary"
                                size="small"
                                onClick={() => moveTeacherDown(currentOrderIndex)}
                                disabled={currentOrderIndex === teachersOrder.length - 1}
                              >
                                {__('Вниз', 'theme')}
                              </Button>
                              <Button
                                variant="secondary"
                                size="small"
                                onClick={() => moveTeacherToEnd(currentOrderIndex)}
                                disabled={currentOrderIndex === teachersOrder.length - 1}
                              >
                                {__('В конец', 'theme')}
                              </Button>
                            </div>

                            <Button
                              variant="secondary"
                              size="small"
                              onClick={() => handleTeacherSelect(teacher.id)}
                            >
                              {__('Удалить', 'theme')}
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Отладочная информация */}
                    <details style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
                      <summary>{__('Отладочная информация', 'theme')}</summary>
                      <div style={{ marginTop: '10px' }}>
                        <p><strong>selectedTeacherIds:</strong> [{selectedTeacherIds?.join(', ') || ''}]</p>
                        <p><strong>teachersOrder:</strong> [{teachersOrder.join(', ')}]</p>
                        <p><strong>selectedTeachers IDs:</strong> [{selectedTeachers.map(t => t.id).join(', ')}]</p>
                      </div>
                    </details>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;