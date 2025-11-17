import { useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

/**
 * Хук для автоматического связывания текста с постами
 * @returns {Object} Объект с функциями и данными для авто-линкинга
 */
export const useAutoLinking = () => {
  // Получаем все посты
  const allPosts = useSelect((select) => {
    return select('core').getEntityRecords('postType', 'post', {
      per_page: -1,
      status: 'publish'
    });
  }, []);

  /**
   * Функция для замены текста на ссылки
   * @param {string} text - Исходный текст
   * @returns {string} - Текст с ссылками
   */
  const replaceTextWithLinks = useCallback((text) => {
    if (!text || !allPosts || allPosts.length === 0) return text;

    let updatedText = text;

    // Сортируем посты по длине заголовка (сначала длинные)
    const sortedPosts = [...allPosts].sort((a, b) =>
      b.title.rendered.length - a.title.rendered.length
    );

    sortedPosts.forEach(post => {
      const postTitle = post.title.rendered.replace(/&nbsp;/g, ' ').trim();
      if (postTitle.length < 3) return; // Пропускаем короткие заголовки

      // Экранируем специальные символы для regex
      const escapedTitle = postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Улучшенное регулярное выражение для кириллицы и любых символов
      // Ищем границы слов для любых символов (включая кириллицу)
      const regex = new RegExp(
        `(^|[^\\p{L}\\d])${escapedTitle}(?![\\p{L}\\d])`,
        'gui' // g - global, u - unicode, i - case insensitive
      );

      // Альтернативный вариант если не поддерживается unicode
      // const regex = new RegExp(
      //   `(^|[^a-zA-Zа-яА-ЯёЁ0-9])${escapedTitle}(?![a-zA-Zа-яА-ЯёЁ0-9])`, 
      //   'gi'
      // );

      // Проверяем, не находится ли уже в ссылке
      const linkRegex = new RegExp(
        `<a[^>]*>${escapedTitle}<\\/a>`,
        'gi'
      );

      if (!linkRegex.test(updatedText)) {
        const link = `<a href="${post.link}" class="auto-linked" data-post-id="${post.id}">${postTitle}</a>`;
        updatedText = updatedText.replace(regex, `$1${link}`);
      }
    });

    return updatedText;
  }, [allPosts]);

  /**
   * Альтернативная функция для сложных случаев с кириллицей
   */
  const replaceTextWithLinksAdvanced = useCallback((text) => {
    if (!text || !allPosts || allPosts.length === 0) return text;

    let updatedText = text;

    const sortedPosts = [...allPosts].sort((a, b) =>
      b.title.rendered.length - a.title.rendered.length
    );

    sortedPosts.forEach(post => {
      const postTitle = post.title.rendered.replace(/&nbsp;/g, ' ').trim();
      if (postTitle.length < 3) return;

      // Простая замена без сложных границ - работает для кириллицы
      const regex = new RegExp(
        `\\b${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'gi'
      );

      // Более надежная проверка на существующие ссылки
      const existingLinkPattern = `<a[^>]*>.*?${postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*?<\\/a>`;
      const linkRegex = new RegExp(existingLinkPattern, 'gi');

      if (!linkRegex.test(updatedText)) {
        const link = `<a href="${post.link}" class="auto-linked" data-post-id="${post.id}">${postTitle}</a>`;
        updatedText = updatedText.replace(regex, link);
      }
    });

    return updatedText;
  }, [allPosts]);

  /**
   * Улучшенная функция с ручной проверкой границ для кириллицы
   */
  const replaceTextWithLinksUnicode = useCallback((text) => {
    if (!text || !allPosts || allPosts.length === 0) return text;

    let updatedText = text;
    const sortedPosts = [...allPosts].sort((a, b) =>
      b.title.rendered.length - a.title.rendered.length
    );

    // Функция для проверки границ слова
    const isWordBoundary = (char) => {
      if (!char) return true; // Начало или конец строки
      const code = char.charCodeAt(0);
      // Проверяем на буквы (латиница, кириллица), цифры
      return !(
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122) || // a-z
        (code >= 1040 && code <= 1103) || // Кириллица
        code === 1105 || code === 1025 || // ёЁ
        (code >= 48 && code <= 57) // 0-9
      );
    };

    sortedPosts.forEach(post => {
      const postTitle = post.title.rendered.replace(/&nbsp;/g, ' ').trim();
      if (postTitle.length < 3) return;

      // Экранируем для regex
      const escapedTitle = postTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedTitle, 'gi');

      // Проверяем существующие ссылки
      const linkRegex = new RegExp(`<a[^>]*>${escapedTitle}<\\/a>`, 'gi');

      if (linkRegex.test(updatedText)) return;

      // Заменяем с ручной проверкой границ
      updatedText = updatedText.replace(regex, (match, offset, original) => {
        // Проверяем границы перед и после совпадения
        const before = original[offset - 1];
        const after = original[offset + match.length];

        if (isWordBoundary(before) && isWordBoundary(after)) {
          return `<a href="${post.link}" class="auto-linked" data-post-id="${post.id}">${match}</a>`;
        }
        return match; // Оставляем без изменений если не границы слова
      });
    });

    return updatedText;
  }, [allPosts]);

  /**
   * Основная функция авто-линкинга
   * @param {Object} attributes - Атрибуты блока
   * @param {Function} setAttributes - Функция установки атрибутов
   * @param {Array} fields - Массив полей для обработки
   */
  const autoLinkContent = useCallback((attributes, setAttributes, fields = ['title', 'subTitle', 'items']) => {
    if (!allPosts || allPosts.length === 0) return;

    const updates = {};

    // Обрабатываем простые текстовые поля
    const textFields = fields.filter(field => field !== 'items');
    textFields.forEach(field => {
      if (attributes[field]) {
        // Используем улучшенную функцию для кириллицы
        const updatedText = replaceTextWithLinksUnicode(attributes[field]);
        if (updatedText !== attributes[field]) {
          updates[field] = updatedText;
        }
      }
    });

    // Обрабатываем элементы (items)
    if (fields.includes('items') && attributes.items && attributes.items.length > 0) {
      const updatedItems = attributes.items.map(item => {
        if (item.content) {
          const updatedContent = replaceTextWithLinksUnicode(item.content);
          return {
            ...item,
            content: updatedContent !== item.content ? updatedContent : item.content
          };
        }
        return item;
      });

      // Проверяем, есть ли изменения
      const hasChanges = updatedItems.some((item, index) =>
        item.content !== attributes.items[index].content
      );
      if (hasChanges) {
        updates.items = updatedItems;
      }
    }

    // Применяем обновления, если они есть
    if (Object.keys(updates).length > 0) {
      setAttributes(updates);
    }
  }, [allPosts, replaceTextWithLinksUnicode]);

  return {
    allPosts,
    autoLinkContent,
    replaceTextWithLinks: replaceTextWithLinksUnicode, // Экспортируем улучшенную версию
    postsCount: allPosts ? allPosts.length : 0
  };
};