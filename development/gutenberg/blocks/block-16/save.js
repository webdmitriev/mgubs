import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-16`,
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <InnerBlocks.Content />
      </div>

    </div>
  );
};

export default Save;
