import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Flex, FlexBlock, Button, ToggleControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-16.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { anchor, bgc, num, title } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const blockProps = useBlockProps({
    className: 'block-style mgu-advantages'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 16 - Структура</span>
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
              <div style={{ display: 'flex', flex: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', gap: '16px', width: '100%' }}>
                <div style={{ width: '30%' }}>
                  <TextareaControl
                    style={{ textAlign: 'left' }}
                    placeholder={__('Число', 'theme')}
                    value={num}
                    onChange={(value) => setAttributes({ num: value })}
                    rows={1}
                  />
                  <RichText
                    style={{ textAlign: 'left' }}
                    placeholder={__('Заголовок', 'theme')}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <div style={{
                  width: 'calc(70% - 18px)',
                  textAlign: 'left',
                  minHeight: '100px'
                }}>
                  <InnerBlocks
                    allowedBlocks={[
                      'core/paragraph',
                      'core/list',
                      'core/quote',
                      'core/table',
                    ]}
                    templateLock={false}
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
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