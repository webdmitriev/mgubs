import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, isNewsCustom, items, buttonText, buttonLink } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-04',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {isNewsCustom ? (
          <div className="article-posts">
            {items.map((item, index) => (
              <a key={index} href={item.link || '#'} class="article-post">
                <Picture data={item.image} className="article-news__img" />
                {item.content && (
                  <RichText.Content
                    tagName="div"
                    value={item.content}
                    className="descr article-news__descr"
                  />
                )}
                {item.date && (
                  <RichText.Content
                    tagName="div"
                    value={item.date}
                    className="descr article-news__date"
                  />
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="popular-news"><RawHTML>{`[featured_posts]`}</RawHTML></div>
        )}

        {/* Кнопка */}
        {buttonText && (<a href={buttonLink} className="btn btn-white">{buttonText}</a>)}
      </div>
    </div>
  );
};

export default Save;