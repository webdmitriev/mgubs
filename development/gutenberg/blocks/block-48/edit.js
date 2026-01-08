import { useEffect, useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Flex, FlexBlock, ToggleControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-48.jpg';

import CF7FormSelector from '../../components/CF7FormSelector';

import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { dataFormId } = attributes;

  const [isPreview, setIsPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!dataFormId) {
      setAttributes({ dataFormId: generateId() });
    }
  }, []);

  const generateId = () => {
    const length = Math.floor(Math.random() * 5) + 8;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  };

  const copyId = async () => {
    if (!dataFormId) return;

    await navigator.clipboard.writeText(dataFormId);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };


  const blockProps = useBlockProps({
    className: 'block-style block-11'
  });

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 48 - Popup форма</span>
            <ToggleControl
              label={isPreview ? __('Редактирование ✍️', 'theme') : __('Предпросмотр ☺️', 'theme')}
              checked={isPreview}
              onChange={togglePreview}
            />
          </div>

          {!isPreview && (
            <img src={blockImage} alt="MGUBS" style={{ width: '100%', height: 'inherit', objectFit: 'contain' }} />
          )}

          {isPreview && (
            <div className="advanced-block-content">
              <Flex direction="column" gap={2}>
                <strong>Popup ID</strong>

                <Flex align="center" gap={2}>
                  <code style={{ padding: '6px 10px', background: '#f3f4f6', borderRadius: 4, userSelect: 'all' }}>
                    {dataFormId || '—'}
                  </code>

                  <Button variant="secondary" onClick={copyId} disabled={!dataFormId}>
                    {copied ? 'Copied ✅' : 'Copy'}
                  </Button>
                </Flex>

                <small style={{ opacity: 0.7 }}>
                  Используй этот ID в data-popup-show
                </small>
              </Flex>

              <div style={{ height: 24 }} />

              <Flex direction={['column', 'row']}>
                <FlexBlock>
                  <CF7FormSelector attributes={attributes} setAttributes={setAttributes} />
                </FlexBlock>
              </Flex>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;