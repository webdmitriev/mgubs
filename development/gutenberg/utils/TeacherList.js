// /utils/TeacherList.js
import { useCallback, useState, useEffect } from '@wordpress/element';
import { TextControl, Spinner, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/* -------------------------------------------------------
   COMPONENT: TeacherSelector
   Выбор преподавателя с поиском по CPT teachers
------------------------------------------------------- */
function TeacherSelector({ value = {}, onChange = () => { } }) {
  const initialTitle = value.title || '';
  const [term, setTerm] = useState(initialTitle);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ⚡ Запрос поиска по teachers
  useEffect(() => {
    if (!term || term.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    apiFetch({
      path: `/custom/v1/teachers-search?search=${encodeURIComponent(term)}`
    })
      .then((res) => {
        setResults(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [term]);

  // Когда выбрали преподавателя
  const handleSelect = (item) => {
    console.log(item);
    onChange({
      teacherId: item.id,
      title: item.title,
      position: item.position,
      custom_excerpt: item.custom_excerpt,
      is_button_off: item.is_button_off,
    });

    setTerm(item.title);
    setResults([]);
  };

  return (
    <div className="teacher-selector" style={{ position: 'relative' }}>
      <TextControl
        label={__('Выберите преподавателя', 'theme')}
        value={term}
        onChange={(v) => {
          setTerm(v);
          if (v.length < 2) {
            onChange({ teacherId: 0, title: v });
          }
        }}
        placeholder={__('Начните вводить имя...', 'theme')}
      />

      {loading && <Spinner />}

      {results.length > 0 && (
        <div
          className="teacher-selector-results"
          style={{
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 4,
            marginTop: 4,
            maxHeight: 240,
            overflowY: 'auto'
          }}
        >
          {results.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => handleSelect(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   HOOK: useTeacherList
   Управление массивом преподавателей
------------------------------------------------------- */
export function useTeacherList(attributes, setAttributes, key = 'teachers') {
  const list = attributes[key] || [];

  const teacherTemplate = {
    teacherId: 0,
    title: '',
    position: '',
    custom_excerpt: '',
    is_button_off: false,
  };

  const setList = useCallback(
    (newList) => setAttributes({ [key]: newList }),
    [key, setAttributes]
  );

  const add = useCallback(() => {
    setList([
      ...list,
      teacherTemplate
    ]);
  }, [list, setList]);

  const remove = useCallback(
    (index) => {
      setList(list.filter((_, i) => i !== index));
    },
    [list, setList]
  );

  const update = useCallback(
    (index, field, value) => {
      setList(
        list.map((item, i) => {
          if (i !== index) return item;

          if (field === null) {
            return { ...item, ...value };
          }

          return { ...item, [field]: value };
        })
      );
    },
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

  /* --- Render helper --- */
  const renderTeachers = (item, index) => {
    return (
      <TeacherSelector
        value={item}
        onChange={(val) => {
          update(index, null, val);
        }}
      />
    );
  };

  return { list, add, remove, moveUp, moveDown, update, renderTeachers };
}
