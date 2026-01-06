import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, subTitle } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-39',
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
            tagName="h1"
            value={title}
            className="h1"
          />
        )}
        {subTitle && (
          <RichText.Content
            tagName="h3"
            value={subTitle}
            className="h3"
          />
        )}
      </div>
    </div>
  );
};

export default Save;
