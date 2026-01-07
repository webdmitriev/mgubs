import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, isStandard, isRevers, isTopTitle, title, content, imageId, imageData, bg1920Id, bg1920Data } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-27 ${isStandard ? 'block-27--style-02' : ''} ${bg1920Id !== 0 ? 'isBgActive' : ''}`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {bg1920Id !== 0 && (<div className="block-bg"><PictureBg bg1920Data={bg1920Data} /></div>)}

      {isTopTitle && (
        title && (
          <div className="container">
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2"
            />
          </div>
        )
      )}
      <div className={`container df-sp-fs ${isRevers ? '' : 'revers'}`}>
        <div class="content-data" style={`${imageId !== 0 ? '' : 'max-width: 100%'}`}>
          {!isTopTitle && (
            title && (
              <RichText.Content
                tagName="h2"
                value={title}
                className="h2"
              />
            )
          )}
          {content && (
            <RichText.Content
              tagName="div"
              value={content}
              className="descr"
            />
          )}
        </div>
        {imageId !== 0 && (<div class="content-image"><Picture data={imageData} /></div>)}
      </div>
    </div>
  );
};

export default Save;
