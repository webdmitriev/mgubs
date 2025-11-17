import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

const Save = ({ attributes }) => {
  const {
    title,
    subTitleOne,
    subTitleTwo,
    descr,
    divider,
    imageUrl,
    imageAlt,
    responsive,
    cf7Shortcode
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `mgu-main`,
  });

  return (
    <main {...blockProps}>
      {imageUrl && (
        <picture>
          {responsive?.webp && (
            <source srcSet={responsive.webp} type="image/webp" />
          )}
          {responsive?.jpg && (
            <source srcSet={responsive.jpg} type="image/jpeg" />
          )}
          <img
            src={responsive?.default || imageUrl}
            alt={responsive?.alt || imageAlt || title || 'MGU'}
            className="mgu-main__bg"
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}

      <div className="container df-sp-ce">
        <div className="mgu-main__content">
          {title && (
            <RichText.Content
              tagName="h1"
              value={title}
              className="h1"
            />
          )}
          {subTitleOne && (
            <RichText.Content
              tagName="p"
              value={subTitleOne}
              className="sub_title"
            />
          )}
          {divider && (
            <div className="divider"></div>
          )}
          {subTitleTwo && (
            <RichText.Content
              tagName="p"
              value={subTitleTwo}
              className="sub_title"
            />
          )}
          {descr && (
            <RichText.Content
              tagName="p"
              className="descr"
              value={descr}
            />
          )}

        </div>
        {cf7Shortcode && <RawHTML>{cf7Shortcode}</RawHTML>}
      </div>
    </main>
  );
};

export default Save;
