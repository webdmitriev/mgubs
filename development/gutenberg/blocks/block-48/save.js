import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

const Save = ({ attributes }) => {
  const { anchor, dataFormId, cf7Shortcode, redirect } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-48`,
    id: anchor,
    "data-popup-form": dataFormId,
    redirect: redirect ? redirect : null
  });

  return (
    <div {...blockProps}>
      <div className="block-close"></div>
      <div className="block-content scroll-line-none">
        {cf7Shortcode && <RawHTML>{cf7Shortcode}</RawHTML>}
      </div>
    </div>
  );
};

export default Save;
