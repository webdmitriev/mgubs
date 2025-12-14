import { useState, useEffect } from '@wordpress/element';
import {
  useBlockProps,
  InspectorControls
} from '@wordpress/block-editor';
import { Button, SelectControl, ToggleControl, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-05.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { programs } = attributes;
  const [isPreview, setIsPreview] = useState(false);
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});

  // Загрузка списка страниц при монтировании компонента
  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const fetchedPages = await apiFetch({
          path: '/wp/v2/pages?per_page=100&status=publish'
        });
        setPages(fetchedPages);
      } catch (error) {
        console.error('Ошибка загрузки страниц:', error);
      }
      setIsLoading(false);
    };

    fetchPages();
  }, []);

  // Функция для загрузки данных страницы по ID
  const fetchPageData = async (pageId, index) => {
    if (!pageId) return;

    setLoadingItems(prev => ({ ...prev, [index]: true }));

    try {
      const page = await apiFetch({
        path: `/wp/v2/pages/${pageId}?_fields=id,title,featured_media,excerpt,link`
      });

      // Получаем URL изображения
      let imageUrl = '';
      if (page.featured_media) {
        try {
          const media = await apiFetch({
            path: `/wp/v2/media/${page.featured_media}`
          });
          imageUrl = media.source_url;
        } catch (error) {
          console.error('Ошибка загрузки изображения:', error);
        }
      }

      let custom_title = '';
      let custom_excerpt = '';
      let shadow_image = '';
      try {
        const meta = await apiFetch({
          path: `/wp/v2/pages/${pageId}?context=edit`
        });
        custom_title = meta.meta.custom_title || '';
        custom_excerpt = meta.meta.custom_excerpt || '';
        shadow_image = meta.meta.shadow_image || '';
      } catch (error) {
        console.error('Ошибка загрузки мета-поля:', error);
      }

      // Обновляем атрибуты - только один раз!
      const newItems = [...programs];
      newItems[index] = {
        ...newItems[index],
        pageId: parseInt(pageId),
        title: custom_title.replace(/\n/g, '<br/>') || page.title.rendered,
        excerpt: page.excerpt.rendered.replace(/\n/g, '<br/>'),
        image: imageUrl,
        metaField: custom_excerpt.replace(/\n/g, '<br/>'),
        shadow: shadow_image,
        link: page.link,
      };

      setAttributes({ programs: newItems });

    } catch (error) {
      console.error('Ошибка загрузки данных страницы:', error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [index]: false }));
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const updateItem = (index, key, value) => {
    const newItems = programs.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setAttributes({ programs: newItems });
  };

  const handlePageSelect = (selectedPageId, index) => {
    const pageId = selectedPageId ? parseInt(selectedPageId) : 0;

    // Сначала обновляем только pageId
    updateItem(index, 'pageId', pageId);

    // Затем загружаем данные страницы, если страница выбрана
    if (pageId) {
      fetchPageData(pageId, index);
    } else {
      // Если страница не выбрана, очищаем данные
      const newItems = [...programs];
      newItems[index] = {
        ...newItems[index],
        title: '',
        excerpt: '',
        image: '',
        metaField: '',
        shadow: '',
        link: '',
      };
      setAttributes({ programs: newItems });
    }
  };

  const addItem = () => {
    setAttributes({
      programs: [
        ...programs,
        {
          pageId: 0,
          title: '',
          excerpt: '',
          image: '',
          metaField: '',
          shadow: '',
          link: '',
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

  // Подготовка опций для SelectControl
  const pageOptions = [
    { label: __('Выберите страницу', 'theme'), value: '' },
    ...pages.map(page => ({
      label: page.title.rendered,
      value: page.id.toString()
    }))
  ];

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 05 - Программы</span>
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
            <div className="advanced-block-content">
              {programs.map((item, index) => (
                <div key={index} className={`programs-item ${item.width}`}>
                  <div style={{ position: 'relative' }}>
                    <SelectControl
                      label="Выберите страницу"
                      value={item.pageId ? item.pageId.toString() : ''}
                      options={pageOptions}
                      onChange={(value) => handlePageSelect(value, index)}
                      disabled={isLoading}
                    />
                    {loadingItems[index] && (
                      <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}>
                        <Spinner />
                      </div>
                    )}
                  </div>

                  {/* Отображение загруженных данных */}
                  {item.title && (
                    <div className="page-data-preview" style={{
                      padding: '12px',
                      border: '1px solid #ddd',
                      margin: '10px 0',
                      borderRadius: '4px'
                    }}>
                      <div className="preview-title" dangerouslySetInnerHTML={{
                        __html: item.title.replace(/\n/g, '<br/>')
                      }} />
                      {item.image && (
                        <img src={item.image} alt={item.title} style={{ display: 'block' }} />
                      )}
                      {item.metaField && (
                        <div className="preview-descr" dangerouslySetInnerHTML={{
                          __html: item.metaField.replace(/\n/g, '<br/>')
                        }} />
                      )}
                    </div>
                  )}

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

                  <Button
                    isDestructive
                    onClick={() => removeItem(index)}
                  >
                    Удалить
                  </Button>
                </div>
              ))}

              <div style={{ display: 'block', width: '100%' }}>
                <Button onClick={addItem} style={{ display: 'block', marginInline: 'auto', border: '1px solid rgba(0,124,186,.5)' }}>
                  + Добавить элемент
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;