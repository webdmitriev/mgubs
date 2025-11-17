import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const {
    title,
    subTitle,
    imageUrl,
    items
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `main`,
  });

  // <RichText.Content tagName="span" value={supTitle} className="sup-title" />
  return (
    <div {...blockProps}>
      <div className="container">
        <div className="line-wrap">
          <div className="main-content">
            <RichText.Content tagName="h1" value={title} className="h1" />
            <RichText.Content tagName="div" value={subTitle} className="sub_title" />
          </div>
          <div className="main-images">
            {imageUrl && (
              <div className="advanced-block-image">
                <img
                  src={imageUrl}
                  alt="NZ Overseas"
                  className="image-01"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </div>
        <div className="line-items">
          {items.map((item, index) => {
            if (!item) return null;
            return (
              <div key={index} className={`line-item line-item-0${index + 1}`}>
                {item.content && (
                  <RichText.Content tagName="p" value={item.content} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Save;
