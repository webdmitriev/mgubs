import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

import HexToRgba from '../../extends/hex-to-rgba';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, date, time, buttonText, buttonLink,
    isContent, second_title, description, items,
    imageData, imageId, rgba
  } = attributes;

  // Разделяем дату на составляющие
  const [year, month, day] = date?.split('-').map(Number);

  // Форматируем дату по-русски
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const monthName = months[parseInt(month) - 1];

  const blockProps = useBlockProps.save({
    className: 'block-standard block-34',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      {date && (<div event-time={time || '00:00'} event-day={day} event-month={month} event-year={year} />)}

      {imageId !== 0 && (
        <div className="block-bg"><Picture data={imageData} /></div>
      )}

      {rgba && (
        <>
          <div className="block-gradient"></div>
          <style>
            {`
              .wp-block-theme-block-34.block-34 .block-gradient { background: linear-gradient(270deg, ${HexToRgba(rgba)} 82%, rgba(0,0,0,0) 100%); }
              @media (max-width: 991px) { .wp-block-theme-block-34.block-34 .block-gradient { background: linear-gradient(0deg, ${HexToRgba(rgba)} 82%, rgba(0,0,0,0) 100%); }}
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
          {date && (
            <div className="date-data df-sp-fe">
              {day && (
                <div className="date-data__day">{day}</div>
              )}
              <div className="date-data__content">
                {monthName && (
                  <div className="date-data__month">{monthName}</div>
                )}
                {time && (
                  <RichText.Content
                    tagName="div"
                    value={time}
                    className="date-data__time"
                  />
                )}
              </div>
            </div>
          )}
          {buttonText && (
            buttonLink ? (
              <a href={buttonLink} className="btn btn-white">{buttonText}</a>
            ) : (
              <button className="btn btn-white btn-show-popup">{buttonText}</button>
            )
          )}
        </div>

        {isContent ? (
          second_title || description ? (
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
          ) : ('')
        ) : (
          items.length > 0 && (
            <div className="content-items">
              {items.map((item, index) => (
                <div key={index} className="content-item df-sp-ce">
                  <Picture data={item.image} />
                  <div className="content-item__data" style={`${imageData ? '' : 'max-width: 100%'}`}>
                    {item.label && (
                      <RichText.Content
                        tagName="div"
                        value={item.label}
                        className="content-item__label descr"
                      />
                    )}
                    {item.content && (
                      <RichText.Content
                        tagName="div"
                        value={item.content}
                        className="descr"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Save;
