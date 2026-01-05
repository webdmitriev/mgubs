import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, date, time, buttonText, buttonLink,
    second_title, description,
    imageData, rgba
  } = attributes;

  function hexToRgba(hex, alpha = 1) {
    if (!hex) return null;

    let cleanHex = hex.replace('#', '');

    // поддержка короткого HEX (#fff)
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split('')
        .map(c => c + c)
        .join('');
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }


  const blockProps = useBlockProps.save({
    className: 'block-standard block-34',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {imageData && (
        <div className="block-bg"><Picture data={imageData} /></div>
      )}

      {rgba && (
        <>
          <div className="block-gradient"></div>
          <style>
            {`
              .wp-block-theme-block-34.block-34 .block-gradient { background: linear-gradient(270deg, ${hexToRgba(rgba)} 82%, rgba(0,0,0,0) 100%); }
              @media (max-width: 991px) { .wp-block-theme-block-34.block-34 .block-gradient { background: linear-gradient(0deg, ${hexToRgba(rgba)} 82%, rgba(0,0,0,0) 100%); }}
            `}
          </style>
        </>
      )}

      <div className="container df-sp-fs">
        <div className="content-title">
          {title && (
            <RichText.Content
              tagName="h1"
              value={title}
              className="h1"
            />
          )}
          <div className="date-data df-sp-fe">
            {date && (
              <RichText.Content
                tagName="div"
                value={date}
                className="descr"
              />
            )}
            <div className="date-data__day">28</div>
            <div className="date-data__content">
              <div className="date-data__month">декабрь</div>
              {time && (
                <RichText.Content
                  tagName="div"
                  value={time}
                  className="date-data__time"
                />
              )}
            </div>
          </div>
          {buttonText && (
            buttonLink ? (
              <a href={buttonLink} className="btn btn-white">{buttonText}</a>
            ) : (
              <button className="btn btn-white btn-show-popup">{buttonText}</button>
            )
          )}
        </div>

        <div className="content-items" style="display: none;">
          <div className="content-item df-sp-ce">
            <img decoding="async" loading="lazy" src="https://mgubs.ru/wp-content/uploads/2023/06/icon-3-3.svg" alt="MGU" />
            <div className="content-item__data">
              <div className="content-item__label descr">label</div>
              <div className="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, itaque!</div>
            </div>
          </div>
        </div>

        <div class="content-description">
          {second_title && (
            <RichText.Content
              tagName="h2"
              value={second_title}
              className="h2"
            />
          )}
          {description && (
            <RichText.Content
              tagName="div"
              value={description}
              className="descr"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Save;
