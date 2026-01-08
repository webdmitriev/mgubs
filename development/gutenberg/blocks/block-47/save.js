import { useBlockProps } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, shadow, video, imageId, imageData } = attributes;

  if (!video) {
    return null;
  }

  const blockProps = useBlockProps.save({
    className: `block-standard block-47`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-content">
          {imageId !== 0 && (<Picture data={imageData} />)}
          <div className="block-shadow" style={`background-color: rgba(0,0,0,0.${shadow || 0})`}></div>
          <button className="block-play" data-video={video}></button>
          <div className="block-iframe"></div>
        </div>
      </div>

    </div>
  );
};

export default Save;
