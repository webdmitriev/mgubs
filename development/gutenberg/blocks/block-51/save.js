import { useBlockProps } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, columns, gallery } = attributes;

  // Если галерея пустая, не выводим ничего
  if (!gallery || gallery.length === 0) {
    return null;
  }

  const blockProps = useBlockProps.save({
    className: `block-standard block-51`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div class={`block-content image-${columns || '1fr'}`}>
          {gallery.map((item, index) => (
            <div key={index} class="block-image"><Picture data={item.imageData} /></div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Save;
