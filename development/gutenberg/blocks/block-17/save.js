import { useBlockProps } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, gallery } = attributes;

  console.log(gallery);

  // Если галерея пустая, не выводим ничего
  if (!gallery || gallery.length === 0) {
    return null;
  }

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
        {gallery.map((item, index) => (
          <Picture key={index} data={item.imageData} className="slider-item" />
        ))}
      </div>

    </div>
  );
};

export default Save;
