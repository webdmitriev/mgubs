const renderSources = (data, media) => {
  if (!data) return null;

  return (
    <>
      {data.responsive?.webp && (
        <source
          media={media}
          type="image/webp"
          srcSet={data.responsive.webp}
        />
      )}

      {data.responsive?.jpg && (
        <source
          media={media}
          type="image/jpeg"
          srcSet={data.responsive.jpg}
        />
      )}
    </>
  );
};

const PictureBg = ({
  bg1920Data,
  bg991Data,
  bg576Data,
  className = '',
}) => {
  // Берём первое доступное изображение для fallback
  const fallback =
    bg1920Data?.url || bg991Data?.url || bg576Data?.url;

  if (!fallback) return null;

  const isSvg = fallback.endsWith('.svg');

  // SVG не имеет смысла пихать в picture
  if (isSvg) {
    return (
      <img
        src={fallback}
        alt={
          bg1920Data?.alt ||
          bg991Data?.alt ||
          bg576Data?.alt ||
          ''
        }
        className={className}
      />
    );
  }

  return (
    <picture>
      {/* mobile first */}
      {renderSources(bg576Data, '(max-width: 576px)')}
      {renderSources(bg991Data, '(max-width: 991px)')}
      {renderSources(bg1920Data, '(min-width: 992px)')}

      <img
        src={
          bg1920Data?.responsive?.default ||
          bg1920Data?.url ||
          fallback
        }
        alt={
          bg1920Data?.alt ||
          bg991Data?.alt ||
          bg576Data?.alt ||
          ''
        }
        loading="lazy"
        className={className}
      />
    </picture>
  );
};

export default PictureBg;
