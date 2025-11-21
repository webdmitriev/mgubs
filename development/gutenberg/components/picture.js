const Picture = ({ data, className = '' }) => {
  if (!data || !data.url) return null;

  const isSvg = data.url.endsWith('.svg');

  // Если SVG — возвращаем обычный img
  if (isSvg) {
    return <img src={data.url} alt={data.alt || ''} className={className} />;
  }

  return (
    <picture>
      {data.responsive?.webp && (
        <source
          type="image/webp"
          srcSet={data.responsive.webp}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}

      {data.responsive?.jpg && (
        <source
          type="image/jpeg"
          srcSet={data.responsive.jpg}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}

      <img
        src={data.responsive?.default || data.url}
        alt={data.alt || ''}
        className={className}
        loading="lazy"
      />
    </picture>
  );
};

export default Picture;