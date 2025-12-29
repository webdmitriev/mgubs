import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-19`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {title && (
          <div className="block-title">
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2 underline"
            />
          </div>
        )}
      </div>
      <div className="content-reviews">
        {items.map((item, index) => (
          <div key={index} className="content-review">
            <Picture data={item.image} className="img" />
            <div className="content-review__descr">
              <RichText.Content
                tagName="h3"
                value={item.name}
                className="h3"
              />
              <RichText.Content
                tagName="div"
                value={item.role}
                className="descr descr-role"
              />
              <RichText.Content
                tagName="div"
                value={item.content}
                className="descr"
              />
            </div>
            <div className="link arrow-hide">Показать полностью</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
