import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const {
    teachersData = [],
    columns = 3,
    showImage = true,
    showPosition = true,
    showDescription = true,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `teachers-block teachers-grid columns-${columns}`,
  });

  if (!teachersData || teachersData.length === 0) {
    return null;
  }

  return (
    <div {...blockProps}>
      {teachersData.map((teacher) => (
        <div
          key={teacher.id}
          className="teacher-item"
          data-teacher-id={teacher.id}
        >
          <div className="teacher-inner">
            {showImage && teacher.imageUrl && (
              <div className="teacher-image">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name || ''}
                  data-image-id={teacher.imageId}
                  loading="lazy"
                />
              </div>
            )}

            <div className="teacher-content">
              {teacher.name && (
                <h3 className="teacher-name">{teacher.name}</h3>
              )}

              {showPosition && teacher.position && (
                <div className="teacher-position">{teacher.position}</div>
              )}

              {showDescription && teacher.description && (
                <div
                  className="teacher-description"
                  dangerouslySetInnerHTML={{ __html: teacher.description }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Save;