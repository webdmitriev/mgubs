import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const {
    anchor, bgc,
    blockIconId, blockIconData, blockTitle, blockItems, buttonText, buttonLink,
    imageId, imageData,
    itemsData, itemsNumbers, bottomTitle, bottomDescr
  } = attributes;

  const firstGroup = itemsNumbers.slice(0, 4); // Первые 4 элемента
  const secondGroup = itemsNumbers.slice(4);   // Все остальные

  const blockProps = useBlockProps.save({
    className: 'block-standard block-36',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-content">
          {blockIconId && (<Picture data={blockIconData} className="icon-location" />)}

          {blockTitle && (
            <RichText.Content
              tagName="h2"
              value={blockTitle}
              className="h2"
            />
          )}

          <div className="block-items">
            {blockItems.map((item, index) => (
              <div key={index} className="block-item">
                <Picture data={item.image} />
                {item.label && (
                  <RichText.Content
                    tagName="div"
                    value={item.label}
                  />
                )}
              </div>
            ))}
          </div>
          {buttonText && (<a href={buttonLink} className="button-map">{buttonText}</a>)}
        </div>

        {imageId && (<div className="block-map"><Picture data={imageData} /></div>)}

        <div className="block-data">
          {itemsData.map((item, index) => (
            <div key={index} className="block-item">
              <Picture data={item.image} />
              {item.label && (
                <RichText.Content
                  tagName="div"
                  value={item.label}
                />
              )}
            </div>
          ))}
        </div>

        <div className="block-numbers block-numbers-1fr">
          {firstGroup.map((item, index) => (
            <div key={index} className="block-number" data-num={item.num}>{item.label}</div>
          ))}
        </div>

        <div className="block-numbers">
          {secondGroup.map((item, index) => (
            <div key={index} className="block-number" data-num={item.num}>{item.label}</div>
          ))}
        </div>

        <div class="block-description" style="margin-top: 40px;">
          {bottomTitle && (
            <RichText.Content
              tagName="h2"
              value={bottomTitle}
              className="h2"
            />
          )}
          {bottomDescr && (
            <RichText.Content
              tagName="div"
              value={bottomDescr}
              className="descr"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
