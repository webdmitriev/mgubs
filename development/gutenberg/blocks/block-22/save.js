import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

const Save = ({ attributes }) => {
  const { anchor, bgc, isBigForm, cf7Shortcode } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-22`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <main {...blockProps}>
      <div className={`${isBigForm ? 'container form-small' : 'container'}`}>
        {cf7Shortcode && <RawHTML>{cf7Shortcode}</RawHTML>}
      </div>
    </main>
  );
};

export default Save;
