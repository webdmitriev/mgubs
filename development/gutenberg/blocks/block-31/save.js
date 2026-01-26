import { useBlockProps, RichText } from '@wordpress/block-editor';
import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const {
    anchor, bgc,
    teacherName, teacherPosition, teacherDescr, teacherImageId, teacherImageData,
    teachers
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `block-standard block-31 block-08`,
    id: anchor,
    style: {
      backgroundColor: bgc || 'transparent',
    }
  });

  return (
    <div {...blockProps}>
      <div className="block-teacher df-fs-st">
        {teacherImageId !== 0 && (
          <div className="teacher__image"><Picture data={teacherImageData} /></div>
        )}
        <div className="teacher__content">
          {teacherName && (
            <RichText.Content
              tagName="h4"
              value={teacherName}
              className="h4"
            />
          )}
          {teacherPosition && (
            <RichText.Content
              tagName="div"
              value={teacherPosition}
              className="descr"
            />
          )}
          {teacherDescr && (
            <>
              <RichText.Content
                tagName="div"
                value={teacherDescr}
                style={{ display: 'none' }}
              />
              <div className="link link-white">Подробнее</div>
            </>
          )}
        </div>
      </div>
      <button className="btn btn-white show-more">Показать ещё</button>

      {teachers.map((item, idx) => (
        <div key={idx} className="block-teachers">
          {item.title && (
            <RichText.Content
              tagName="h3"
              value={item.title}
              className="h3"
            />
          )}
          <div className="container">
            {item.items.map((el, index) => (
              <div key={index} className="teacher-article">
                {el.imageId !== 0 && (
                  <Picture data={el.imageData} className="teacher-image" />
                )}
                {el.name && (
                  <RichText.Content
                    tagName="div"
                    value={el.name}
                    className="teacher-title"
                  />
                )}
                {el.role && (
                  <RichText.Content
                    tagName="div"
                    value={el.role}
                    className="teacher-descr"
                  />
                )}
                {el.descr && (
                  <>
                    <RichText.Content
                      tagName="div"
                      value={el.descr}
                      className="teacher-description"
                      style={{ display: 'none' }}
                    />
                    <div className="teacher-link">Подробнее</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Save;
