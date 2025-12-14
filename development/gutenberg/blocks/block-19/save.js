import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-19`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'var(--accent-color);',
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
            <RichText.Content
              tagName="div"
              value={item.content}
              className="descr"
            />
            <div className="link arrow-hide">Показать полностью</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
