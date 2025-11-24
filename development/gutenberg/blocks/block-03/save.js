import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { title, bgData } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-03 df-fs-fe',
  });

  return (
    <div {...blockProps}>
      <Picture data={bgData} className="block-bg" />
      <div className="container">
        <RichText.Content
          tagName="h2"
          value={title}
          className="h2"
        />
      </div>
    </div>
  );
};

export default Save;
