import { useBlockProps, RichText } from '@wordpress/block-editor';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { title, bg1920Data, bg991Data } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-03 df-fs-fe',
  });

  return (
    <div {...blockProps}>
      <PictureBg
        bg1920Data={bg1920Data}
        bg991Data={bg991Data}
        className="block-bg"
      />

      <div className="container">
        <RichText.Content
          tagName="h2"
          value={title}
          className="h2"
        />
      </div>
    </div>
  );
};

export default Save;
