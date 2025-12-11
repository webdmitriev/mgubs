import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-16`,
  });

  return (
    <div {...blockProps}>
      <div className="container content-items df-sp-fs">
        {items.map((item, index) => (
          <div key={index} className="content-item df-sp-fs">
            <RichText.Content
              tagName="div"
              value={item.num}
              className="content-item__num"
            />
            <div className="content-item__line"></div>
            <div className="content-item__head">
              <RichText.Content
                tagName="div"
                value={item.title}
                className="descr"
              />
            </div>
            <div className="content-item__descr">
              <RichText.Content
                tagName="div"
                value={item.content}
                className="content-item__descr-overflow"
              />
            </div>
            <div className="link block-16-link" data-name="Подробнее" data-rename="Свернуть">Подробнее</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Save;
