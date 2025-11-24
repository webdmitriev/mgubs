import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import programs from '../../utils/default-programs';

import ContentPanel from './controls/ContentPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, selectedProgram } = attributes;

  const [isPreview, setIsPreview] = useState(true);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
        <PanelBody title={__('Программы', 'theme')} initialOpen={false}>
          <SelectControl
            label="Выберите программу"
            value={selectedProgram}
            options={programs}
            onChange={(value) => setAttributes({ selectedProgram: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 02</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <div>Картинка</div>
          )}

          {isPreview && (
            <div className="advanced-block-content">
              <div className="advanced-block-text">
                <>
                  <label htmlFor="rich-title" className="my-rich-text__label">Заголовок</label>
                  <RichText
                    id="rich-title"
                    tagName="div"
                    label="Заголовок"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </>

                <div className="popular-events-preview">
                  {selectedProgram ? (
                    <p>Будут показаны события для программы: <strong>{programs.find(p => p.value === selectedProgram)?.label}</strong></p>
                  ) : (
                    <p>Выберите программу в панели настроек</p>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
