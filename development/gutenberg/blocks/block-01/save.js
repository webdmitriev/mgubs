import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, isBlockLine, second_title, description,
    imageData, bg1920Data, bg991Data, bg576Data
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-01',
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
        className="block-01-bg"
      />

      <div className="container df-sp-st">
        <div className="block-left">
          <RichText.Content
            tagName="h1"
            value={title}
            className="h1"
          />
        </div>

        {isBlockLine && (
          <div className="block-line" />
        )}

        <div className="block-right">
          <RichText.Content
            tagName="h2"
            value={second_title}
            className="h2"
          />

          <RichText.Content
            tagName="p"
            value={description}
            className="descr"
          />

          <Picture data={imageData} className="block-01-image" />
        </div>
      </div>
    </div>
  );
};

export default Save;
