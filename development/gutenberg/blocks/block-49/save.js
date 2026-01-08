import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { descr } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-49',
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-content">
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
