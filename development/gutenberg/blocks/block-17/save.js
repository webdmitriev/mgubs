import { useBlockProps } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-17`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'var(--accent-color);',
    }
  });

  return (
    <div {...blockProps}>
      <div className="slider-items">
        {items.map((item, index) => (
          <Picture key={index} data={item.image} className="slider-item" />
        ))}
      </div>

    </div>
  );
};

export default Save;
