import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, subTitle, buttonText, buttonLink } = attributes;

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
        {title && (
          <RichText.Content
            tagName="h3"
            value={title}
            className="h3"
          />
        )}
        {subTitle && (
          <RichText.Content
            tagName="p"
            value={subTitle}
            className="descr"
          />
        )}

        {buttonText && (
          <a href={buttonLink} className="btn btn-orange">{buttonText}</a>
        )}
      </div>
    </div>
  );
};

export default Save;
