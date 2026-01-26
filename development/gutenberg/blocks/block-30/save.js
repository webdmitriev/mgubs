import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, items,
    authorImageData, authorName, authorData,
    imageData
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-30`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {title && (
        <div className="container">
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2"
          />
        </div>
      )}
      <div className="container df-sp-fs">
        <div className="content-descr">
          {items.map((item, index) => (
            <RichText.Content
              tagName="div"
              value={item.content}
              className="descr"
            />
          ))}
        </div>
        <div className="content-images">
          <div className="content-author">
            <Picture data={authorImageData} />
            <div className="content-author__data">
              {authorName && (
                <RichText.Content
                  tagName="h3"
                  value={authorName}
                  className="h3"
                />
              )}
              {authorData && (
                <RichText.Content
                  tagName="div"
                  value={authorData}
                  className="descr"
                />
              )}
            </div>
          </div>
          <Picture data={imageData} className="second-picture" />
        </div>
      </div>
    </div>
  );
};

export default Save;
