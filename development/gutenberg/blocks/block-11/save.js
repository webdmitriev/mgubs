import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, subTitleOne, subTitleTwo, descr,
    divider, imageData, bg1920Data, bg991Data, bg576Data, cf7Shortcode
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-11`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <main {...blockProps}>
      <PictureBg
        bg1920Data={bg1920Data}
        bg991Data={bg991Data}
        bg576Data={bg576Data}
        className="mgu-main__bg"
      />

      <div className="container df-sp-ce">
        <div className="mgu-main__content">
          <Picture data={imageData} className="icon-vertical" />
          {title && (
            <RichText.Content
              tagName="h1"
              value={title}
              className="h1"
            />
          )}
          {subTitleOne && (
            <RichText.Content
              tagName="p"
              value={subTitleOne}
              className="sub_title"
            />
          )}
          {divider && (
            <div className="divider"></div>
          )}
          {subTitleTwo && (
            <RichText.Content
              tagName="p"
              value={subTitleTwo}
              className="sub_title"
            />
          )}
          {descr && (
            <RichText.Content
              tagName="p"
              className="descr"
              value={descr}
            />
          )}

        </div>
        {cf7Shortcode && <RawHTML>{cf7Shortcode}</RawHTML>}
      </div>
    </main>
  );
};

export default Save;
