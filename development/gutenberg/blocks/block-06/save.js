import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, subTitle, buttonText, buttonOption } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-06',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div class="container">
        <RichText.Content
          tagName="h3"
          value={title}
          className="h3"
        />
        <RichText.Content
          tagName="p"
          value={subTitle}
          className="descr"
        />
        <RichText.Content
          tagName="button"
          value={buttonText}
          className={`btn btn-orange ${buttonOption}`}
        />
      </div>
    </div>
  );
};

export default Save;
