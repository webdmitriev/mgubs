import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-21`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'var(--accent-color);',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container accordion-container">
        {items.map((item, index) => (
          <div key={index} class="panel">
            <RichText.Content
              tagName="div"
              value={item.title}
              className="panel-heading"
            />
            <div className="panel-collapse" style="display: none;">
              <RichText.Content
                tagName="div"
                value={item.content}
                className="panel-body descr"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
