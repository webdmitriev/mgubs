import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-14`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <RichText.Content
          tagName="h2"
          value={title}
          className="h2"
        />
        <div className="slider-items block-14-slider">
          {items.map((item, index) => (
            <div key={index} className="slider-item owner-slide slide">
              {item.image && (
                <img src={item.image.url} alt="alto" />
              )}
              <RichText.Content
                tagName="div"
                value={item.content}
                className="slider-item__content"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Save;
