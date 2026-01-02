import { useBlockProps } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  if (!items || items.length === 0) {
    return null;
  }

  const blockProps = useBlockProps.save({
    className: `block-standard block-32`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'var(--accent-color);',
    }
  });

  return (
    <div {...blockProps}>
      <div className="block-slider">
        {items.map((item, index) => (
          <div key={index} className="block-slide">
            <Picture data={item.image} />
            <div className="block-slide__shadow" style={`background-color: rgba(0,0,0,0.${item.shadow || 0})`}></div>
            <button className="block-slide__play" data-video={item.link}></button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Save;
