import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-25`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div class="block-title" style={{ marginBottom: '24px' }}>
          {title && (
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2 underline"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
