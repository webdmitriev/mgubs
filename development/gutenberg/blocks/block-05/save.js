import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { programs } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-05',
  });

  return (
    <div {...blockProps}>
      <div className="container df-fs-st">
        {programs.map((item, index) => (
          <div key={index} className={`block-program ${item.width}`}>

            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="block-program__image"
              />
            )}

            <div className="block-program__shadow" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />

            <h4 className="h4">{item.title}</h4>
            <p className="descr">{item.excerpt}</p>

            {item.url && (
              <a href={item.url} className="program-link"></a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
