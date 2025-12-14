import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-15block-standard block-15`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-title">
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2 underline"
          />
        </div>
        <div className="content-items">
          {items.map((item, index) => (
            <div key={index} class="content-item">
              <RichText.Content
                tagName="div"
                value={item.title}
                className="content-item__num"
              />
              <RichText.Content
                tagName="div"
                value={item.content}
                className="content-item__content"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Save;
