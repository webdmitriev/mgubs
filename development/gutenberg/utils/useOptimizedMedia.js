import { useCallback } from '@wordpress/element';

/**
 * Хук для выбора изображения и сохранения всех атрибутов,
 * включая adaptive/responsive версии, с WebP.
 */
export const useOptimizedMedia = (setAttributes) => {
  const onSelectImage = useCallback((media) => {
    if (!media || !media.id) return;

    // Берём responsive из REST API, который вернул PHP
    const responsive = media.responsive || {
      webp: '',
      jpg: '',
      default: media.url || '',
    };

    setAttributes({
      imageUrl: media.url || '',
      imageId: media.id,
      imageAlt: media.alt || '',
      responsive: responsive,
    });

  }, [setAttributes]);

  return { onSelectImage };
};
