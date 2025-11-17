import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title, bgc, underlineColor, items } = attributes;

  const blockProps = useBlockProps.save({
    style: { backgroundColor: bgc },
    className: `mgu-advantages`,
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-title">
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2"
            style={{ backgroundImage: `linear-gradient(180deg, ${underlineColor}, ${underlineColor})` }}
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="advantages-item">
            {item.imageURL && (
              <img className="advantages-item__icon" src={item.imageURL} alt="alto" />
            )}
            <RichText.Content
              tagName="div"
              value={item.content}
              className="advantages-item__content"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Save;
