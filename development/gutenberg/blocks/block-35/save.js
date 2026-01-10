import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, subTitle, descr, buttonText, buttonLink,
    imageData, imageId
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-35',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {imageId !== 0 && (
        <div className="bg-content"><Picture data={imageData} className="block-01-image" /></div>
      )}
      <div className="container">
        {title && (
          <RichText.Content
            tagName="div"
            value={title}
            className="h1"
          />
        )}
        {subTitle && (
          <RichText.Content
            tagName="div"
            value={subTitle}
            className="descr bold"
          />
        )}
        {descr && (
          <RichText.Content
            tagName="div"
            value={descr}
            className="descr"
          />
        )}
        {buttonText && (
          <a href={buttonLink} className="link link-white">{buttonText}</a>
        )}
      </div>
    </div>
  );
};

export default Save;
