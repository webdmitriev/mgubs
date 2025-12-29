import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, selectedPosts } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-23`,
    id: anchor
  });

  return (
    <div {...blockProps}>
      <div className="container content-items">
        {/* {items.map((item, index) => (
          <div key={index} className="content-item df-fs-fs">
            <Picture data={item.image} className="img" />
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
        ))} */}
      </div>
    </div>
  );
};

export default Save;
