import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title, subTitle, buttonText, buttonOption } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-07',
  });

  return (
    <div {...blockProps}>
      <div class="container">
        <RichText.Content
          tagName="h3"
          value={title}
          className="h3"
        />
      </div>
    </div>
  );
};

export default Save;
