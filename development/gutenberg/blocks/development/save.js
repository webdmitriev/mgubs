import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const {
    supTitle,
    title,
    description,
    button,
    backgroundColor,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `main-block`,
    style: { backgroundColor },
  });

  return (
    <div {...blockProps}>
      <div className="advanced-block-content">
        <div className="advanced-block-text">
          <RichText.Content tagName="span" value={supTitle} className="sup-title" />
          <RichText.Content tagName="h1" value={title} className="title" />
          <RichText.Content tagName="p" value={description} className="description" />
          <RichText.Content tagName="button" value={button} className="btn" />
        </div>
      </div>
    </div>
  );
};

export default Save;
