import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title, shortcode } = attributes;
  const blockProps = useBlockProps.save({ className: 'request' });

  if (!shortcode) return null;

  const formattedTitle = title.replace(/\n/g, '<br />');

  return <section {...blockProps}>
    <div className="container">
      <div className="line-wrap">
        <h2
          className="h2"
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
        {shortcode}
      </div>
    </div>
  </section>;
};

export default Save;
