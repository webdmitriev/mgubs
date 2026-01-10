import { useBlockProps, RichText } from '@wordpress/block-editor';
import PictureBg from '../../components/PictureBg';

const Save = ({ attributes }) => {
  const {
    anchor, bgc, title, descr, isBlockLine, buttonText, buttonLink, isHideSecondBlock,
    bg1920Data, bg991Data, bg576Data
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-43',
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div class="bg-content">
        <PictureBg
          bg1920Data={bg1920Data}
          bg991Data={bg991Data}
          bg576Data={bg576Data}
        />
      </div>

      <div className="container df-sp-st">
        <div className="block-content">
          {title && (
            <RichText.Content
              tagName="h1"
              value={title}
              className="h1"
            />
          )}
          {isBlockLine && (<div className="divider" />)}
          {descr && (
            <RichText.Content
              tagName="div"
              value={descr}
              className="descr"
            />
          )}
          {buttonText && (
            <a href={buttonLink} className="btn btn-white">{buttonText}</a>
          )}
        </div>

        {isHideSecondBlock && (
          <div className="block-date">
            <div className="divider"></div>
            <h2 className="h2">Начало</h2>
            <div className="content-date df-sp-ce">
              <div className="block-date__day">01</div>
              <div className="block-date__content">
                <h2 className="h2 block-date__month">Января</h2>
                <div className="descr block-date__time">00:01</div>
              </div>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer">Добавьте напоминание в календарь</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Save;
