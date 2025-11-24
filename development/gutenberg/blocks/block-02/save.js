import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title, selectedProgram, buttonText, buttonLink } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-02',
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-title">
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2 underline"
          />
        </div>

        {/* Динамический контент будет рендериться на сервере */}
        <div
          className="popular-events-content"
          data-program={selectedProgram}
          data-limit="5"
        />

        {buttonText && (<a href={buttonLink} className="btn btn-white">{buttonText}</a>)}
      </div>
    </div>
  );
};

export default Save;