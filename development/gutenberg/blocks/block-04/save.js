import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

const Save = ({ attributes }) => {
  const { buttonText, buttonLink, title } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-04',
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {/* Заголовок блока (если есть в атрибутах) */}
        {title && (
          <RichText.Content
            tagName="h2"
            value={title}
            className="block-title"
          />
        )}

        <div className="popular-news">
          <RawHTML>
            {`[featured_posts]`}
          </RawHTML>
        </div>

        {/* Кнопка */}
        {buttonText && (
          <a href={buttonLink} className="btn btn-white">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Save;