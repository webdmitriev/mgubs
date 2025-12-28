import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, subTitle, buttonText, buttonId, buttonOption } = attributes;

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

        {buttonText && (
          buttonOption ? (
            <a className="btn btn-orange ancLinks" href={`#${buttonId}`}>{buttonText}</a>
          ) : (
            <button className="btn btn-orange" show-popup={buttonId}>{buttonText}</button>
          )
        )}
      </div>
    </div>
  );
};

export default Save;
