import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-26`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div class="block-title" style={{ marginBottom: '24px' }}>
          {title && (
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2 underline"
            />
          )}
        </div>
        <div className="content-items">
          {items.map((item, index) => (
            <a key={index} href={item.link || '#'} class="content-item">
              <div class="content-item__content df-fs-fe">
                <Picture data={item.image} className="content-item__image" />
                {item.title && (
                  <RichText.Content
                    tagName="h4"
                    value={item.title}
                    className="h4 content-item__title"
                  />
                )}
                {item.subTitle && (
                  <RichText.Content
                    tagName="div"
                    value={item.subTitle}
                    className="descr content-item__descr"
                  />
                )}
              </div>
              {item.content && (
                <RichText.Content
                  tagName="div"
                  value={item.content}
                  className="descr"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
