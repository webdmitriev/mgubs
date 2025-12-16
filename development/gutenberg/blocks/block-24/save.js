import { useBlockProps, RichText } from '@wordpress/block-editor';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, titleSecond, descr, bg1920Data, bg991Data, bg576Data } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-24`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <PictureBg
        bg1920Data={bg1920Data}
        bg991Data={bg991Data}
        bg576Data={bg576Data}
        className="image-bg"
      />
      <div className="container df-sp-fs">
        <div className="content-title">
          {title && (
            <RichText.Content
              tagName="h1"
              value={title}
              className="h1"
            />
          )}
        </div>
        <div className="content-descr with-border">
          {titleSecond && (
            <RichText.Content
              tagName="h2"
              value={titleSecond}
              className="h2"
            />
          )}
          {descr && (
            <RichText.Content
              tagName="div"
              value={descr}
              className="descr"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
