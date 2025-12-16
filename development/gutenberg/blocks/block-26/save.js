import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-24`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <Picture data={item.image} className="img" />
      <div className="container content-items">
        {items.map((item, index) => (
          <div key={index} className="content-item df-fs-fs">
            {item.content && (
              <RichText.Content
                tagName="div"
                value={item.content}
                className="descr content-item__head"
              />
            )}
            {item.contacts && (
              <RichText.Content
                tagName="div"
                value={item.contacts}
                className="descr content-item__contacts df-fs-fs"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
