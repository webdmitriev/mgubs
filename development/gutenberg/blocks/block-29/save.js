import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc, items } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-29`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="container">
        {items.map((item, index) => (
          <div key={index} className="content-block df-sp-fs">
            <div className="circles"></div>
            <div className="content-block__image"><Picture data={item.image} /></div>
            <div className="content-block__data">
              {item.label && (
                <h2 className="h2">{item.label} <div className="circle"></div></h2>
              )}
              {item.content && (
                <div className="descr">{item.content}</div>
              )}
              {item.link && (
                <a href={item.link} className="link">Подробнее</a>
              )}
            </div>
          </div>
        ))}
      </div>
      {items.length > 3 && (
        <div className="content-button">
          <div className="circles"></div>
          <div className="btn btn-white">Показать ещё</div>
        </div>
      )}
    </div>
  );
};

export default Save;
