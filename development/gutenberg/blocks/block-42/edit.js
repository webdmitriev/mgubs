import { useState } from '@wordpress/element';
import { useBlockProps, RichText, URLInput, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-42.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, items } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const itemsList = useAttributeList(attributes, setAttributes, 'items');

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 42 - Management</span>
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

              <Flex>
                <FlexBlock>
                  <label className="my-rich-text__label">Заголовок</label>
                  <RichText
                    tagName="div"
                    label="Заголовок"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
              </Flex>

              {items === 0 ? (
                <div style={{ padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                  Собрать блоки
                </div>
              ) : (
                <div style={{ display: 'block', width: '100%', padding: 12, backgroundColor: 'rgba(0,124,186,.25)', borderRadius: 12, border: '2px dashed #333' }}>
                  <Flex>
                    <FlexBlock>
                      <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                        {items.map((item, index) => (
                          <div key={index} className="repeater-item numerations-item">
                            <div className="items-control">
                              <div className="items-control__buttons">
                                <Button onClick={() => itemsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                                <Button onClick={() => itemsList.moveDown(index)} disabled={index === items.length - 1} style={{ opacity: index === (items.length - 1) ? 0.4 : 1 }}>➡️</Button>
                              </div>
                              <Button isDestructive onClick={() => itemsList.remove(index)}>❌</Button>
                            </div>

                            {itemsList.renderBlockFortyTwo(item, index)}
                          </div>
                        ))}
                      </div>
                      <div style={{ height: 8 }} />
                      <Button
                        onClick={() => itemsList.add({ image: '', title: '', descr: '', buttonText: '', buttonLink: '' })}
                        className="add-repeater-item"
                        style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                      >
                        {__('+ Добавить элемент', 'theme')}
                      </Button>
                    </FlexBlock>
                  </Flex>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
