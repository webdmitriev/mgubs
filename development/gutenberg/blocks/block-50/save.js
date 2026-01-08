import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { descr, signature } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-50',
  });

  return (
    <div {...blockProps}>
      <div className="container">
        <div className="block-content">
          <div className="blockquote">
            <div className="blockquote-icon">
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6224_1708)">
                  <path d="M11.4851 0V5.24255C7.72548 5.62837 5.84569 7.87518 5.84569 11.983V12.5957H11.4851V24H0V13.4128C0 7.98865 1.00867 4.40284 3.026 2.65532C5.06627 0.885106 7.88595 0 11.4851 0ZM29.0909 0V5.24255C25.3313 5.62837 23.4515 7.87518 23.4515 11.983V12.5957H29.0909V24H17.6058V13.4128C17.6058 7.98865 18.6145 4.40284 20.6319 2.65532C22.6721 0.885106 25.4918 0 29.0909 0Z" fill="var(--accent-color)" />
                </g>
                <defs>
                  <clipPath id="clip0_6224_1708">
                    <rect width="30" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {descr && (
              <RichText.Content
                tagName="div"
                value={descr}
                className="descr"
              />
            )}
            {signature && (
              <RichText.Content
                tagName="div"
                value={signature}
                className="descr signature"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
