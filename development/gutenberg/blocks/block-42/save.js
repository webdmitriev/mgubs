import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-42',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {title && (
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2"
          />
        )}
        <div className="block-items">
          {items.map((item, index) => (
            <div key={index} className="block-item">
              <div class="block-item__image"><Picture data={item.image} /></div>
              {item.title && (
                <RichText.Content
                  tagName="h3"
                  value={item.title}
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
              {item.buttonText && (
                item.buttonLink ? (
                  <a href={item.buttonLink} className="btn btn-orange">{item.buttonText}</a>
                ) : (
                  <button className="btn btn-orange btn-show-popup">{item.buttonText}</button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;