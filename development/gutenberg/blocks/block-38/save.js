import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, titleOne, titleTwo, oneImageId, oneImageData, twoImageId, twoImageData } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-38',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-content">
          {titleOne && (
            <RichText.Content
              tagName="h2"
              value={titleOne}
              className="h2"
            />
          )}
          {oneImageId && (
            <div className="block-content__image">
              <Picture data={oneImageData} />
            </div>
          )}
        </div>
        <div className="block-content">
          {titleTwo && (
            <RichText.Content
              tagName="h2"
              value={titleTwo}
              className="h2"
            />
          )}
          {twoImageId && (
            <div className="block-content__image">
              <Picture data={twoImageData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
