import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, isRevers, isTopTitle, title, content, imageId, imageData } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-27`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {isTopTitle && (
        title && (
          <div className="container">
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2"
            />
          </div>
        )
      )}
      <div className={`container df-sp-fs ${isRevers ? '' : 'revers'}`}>
        <div class="content-data" style={`${imageId !== 0 ? '' : 'max-width: 100%'}`}>
          {!isTopTitle && (
            title && (
              <RichText.Content
                tagName="h2"
                value={title}
                className="h2"
              />
            )
          )}
          {content && (
            <RichText.Content
              tagName="div"
              value={content}
              className="descr"
            />
          )}
        </div>
        {imageId !== 0 && (
          <div class="content-image"><Picture data={imageData} /></div>
        )}
      </div>
    </div>
  );
};

export default Save;
