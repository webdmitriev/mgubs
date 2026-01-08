import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

import HexToRgba from '../../extends/hex-to-rgba';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-44',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {items.map((item, index) => (
          <div class="block-item">
            {item.content && (
              <RichText.Content
                tagName="div"
                value={item.content}
                className="descr"
              />
            )}
            {item.buttonText && (
              <a href={item.buttonLink || '#'} class="link">{item.buttonText}</a>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Save;
