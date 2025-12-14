import { useBlockProps, RichText } from '@wordpress/block-editor';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const { anchor, bgc, title, items, bg1920Data, bg991Data, bg576Data } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-20`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <PictureBg
        bg1920Data={bg1920Data}
        bg991Data={bg991Data}
        bg576Data={bg576Data}
        className="bg-image"
      />

      <div className="container">
        {title && (
          <RichText.Content
            tagName="h2"
            value={title}
            className="h2"
          />
        )}
        <div className="content-items df-ce-st">
          {items.map((item, index) => (
            <div className="content-item">
              {item.title && (
                <RichText.Content
                  tagName="h4"
                  value={item.title}
                  className="h4"
                />
              )}
              {item.sum && (
                <RichText.Content
                  tagName="div"
                  value={item.sum}
                  className="content-item__sum"
                />
              )}
              {item.content && (
                <RichText.Content
                  tagName="div"
                  value={item.content}
                  className="descr"
                />
              )}
              {item.isButton && (
                <button className="btn btn-orange">Оставить заявку</button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Save;
