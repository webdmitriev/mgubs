import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-45',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {items.map((item, index) => (
          <div key={index} className="block-item">
            <div className="block-item__icon"><Picture data={item.icon} /></div>
            <div className="block-item__avatar"><Picture data={item.image} /></div>
            {item.name && (
              <RichText.Content
                tagName="h3"
                value={item.name}
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
