import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-37',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {title && (
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2"
          />
        )}
        {items.map((item, index) => (
          <div key={index} className="block-content">
            {item.title && (
              <RichText.Content
                tagName="h3"
                value={item.title}
                className="h3"
              />
            )}
            {item.descr && (
              <RichText.Content
                tagName="div"
                value={item.descr}
                className="descr"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
