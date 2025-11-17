import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, shortcode } = attributes;
  const blockProps = useBlockProps({ className: 'request' });

  // Массив с доступными формами
  const availableForms = [
    { label: __('-- Select Form --', 'theme'), value: '' },
    { label: __('Form - En', 'theme'), value: '[contact-form-7 id="8416c02" title="form-en"]' },
    { label: __('Form - Sp', 'theme'), value: '[contact-form-7 id="3d00121" title="form-sp"]' },
    { label: __('Form - Ru', 'theme'), value: '[contact-form-7 id="c42a913" title="form-ru"]' },
  ];

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />

        <PanelBody title={__('Contact Form 7 Settings', 'theme')} initialOpen={true}>
          <SelectControl
            label={__('Select Form', 'theme')}
            value={shortcode}
            options={availableForms}
            onChange={(value) => setAttributes({ shortcode: value })}
          />

          {shortcode && (
            <div style={{ marginTop: '15px', padding: '10px', background: '#f6f7f7', borderRadius: '4px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>
                {__('Selected Shortcode:', 'theme')}
              </p>
              <code style={{ fontSize: '11px', wordBreak: 'break-all' }}>
                {shortcode}
              </code>
            </div>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>

        <div className="block-title">
          <TextareaControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            placeholder={__('Add title...', 'theme')}
            rows={3}
          />
        </div>

        {shortcode ? (
          <div className="cf7-preview" style={{
            padding: '20px',
            border: '2px dashed #ccc',
            textAlign: 'center'
          }}>
            <p>📝 {__('Contact Form Preview', 'theme')}</p>
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: '#f9f9f9',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              <strong>{__('Shortcode in use:', 'theme')}</strong>
              <br />
              <code>{shortcode}</code>
            </div>
          </div>
        ) : (
          <div style={{
            padding: '20px',
            border: '2px dashed #ccc',
            textAlign: 'center',
            color: '#8c8f94'
          }}>
            <p>📋 {__('Please select a contact form from the block settings.', 'theme')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;