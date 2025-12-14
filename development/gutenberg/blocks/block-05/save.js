import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, programs } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-05',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container df-fs-st">
        {programs.map((item, index) => (
          <a key={index} href={item.link} className={`block-program ${item.width}`}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="block-program__image"
              />
            )}

            <div
              className="block-program__shadow"
              style={{ backgroundColor: `rgba(0,0,0,0.${Math.floor(item.shadow)})` }}
            />

            <h4
              className="h4"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />

            <p
              className="descr"
              dangerouslySetInnerHTML={{ __html: item.metaField }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Save;
