import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, descr, buttonText, buttonLink, imageData } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-33',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="block-bg"><Picture data={imageData} /></div>

      <div className="container">
        {title && (
          <RichText.Content
            tagName="h3"
            value={title}
            className="h3"
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
          <a href={buttonLink} className="btn btn-white">{buttonText}</a>
        )}
      </div>
    </div>
  );
};

export default Save;
