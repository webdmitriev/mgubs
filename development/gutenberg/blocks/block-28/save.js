import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, label, content, imageId, imageData } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-28`,
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
        <div class="content-items df-ce-fe">
          <div className="content-data">
            {label && (
              <h2 className="h2">{label}<div class="circle"></div></h2>
            )}
            {content && (
              <div className="descr">{content}<div class="circles"></div></div>
            )}
          </div>
          {imageId !== 0 && (
            <div class="content-image"><Picture data={imageData} /></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
