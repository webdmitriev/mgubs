import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { supTitle, title, description, button, backgroundColor } = attributes;

  const blockProps = useBlockProps({
    className: 'main-block',
    style: { backgroundColor },
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">🎨 Заглавный блок</div>

          <div className="advanced-block-content">
            <div className="advanced-block-text">
              <RichText
                tagName="span"
                value={supTitle}
                onChange={(value) => setAttributes({ supTitle: value })}
                placeholder={__('Текст...', 'theme')}
                className="sup-title"
              />

              <RichText
                tagName="h1"
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                placeholder={__('Заголовок...', 'theme')}
                className="title"
              />

              <RichText
                tagName="p"
                value={description}
                onChange={(value) => setAttributes({ description: value })}
                placeholder={__('Описание...', 'theme')}
                className="description"
              />

              {/* <RichText
                tagName="p"
                value={button}
                onChange={(value) => setAttributes({ button: value })}
                placeholder={__('Текст кнопки...', 'theme')}
                className="btn"
              /> */}
              <RichText.Content tagName="span" value={button} className="btn" />
            </div>
            <div className="advanced-block-image">
              image
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
