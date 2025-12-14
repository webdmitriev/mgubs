import { useBlockProps, RichText } from '@wordpress/block-editor';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, descr, btnText, btnLink, bg1920Data, bg991Data, bg576Data } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-18`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'var(--accent-color);',
    }
  });

  return (
    <div {...blockProps}>
      <PictureBg
        bg1920Data={bg1920Data}
        bg991Data={bg991Data}
        bg576Data={bg576Data}
        className="img"
      />

      <div className="container">
        {title && (
          <RichText.Content
            tagName="h2"
            value={title}
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

        {btnText && (
          <a href={btnLink} className="link link-white">{btnText}</a>
        )}
      </div>

    </div>
  );
};

export default Save;
