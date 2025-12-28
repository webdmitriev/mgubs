import { useState } from '@wordpress/element';
import { useBlockProps, RichText, URLInput, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-04.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { isNewsCustom, items, buttonText, buttonLink } = attributes;

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
        <BgAnchorPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 04 - Новости</span>
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

              <div style={{ width: '100%', padding: 4, border: '1px dashed #222', borderRadius: 4 }}>
                <div>Новости берутся из страницы настроек</div>
                <div style={{ height: 12 }} />
                <Flex>
                  <FlexItem>
                    <ToggleControl
                      label={isNewsCustom ? __('Кастомные новости ✅', 'theme') : __('Кастомные новости ❌', 'theme')}
                      checked={isNewsCustom}
                      onChange={(value) => setAttributes({ isNewsCustom: value })}
                    />
                  </FlexItem>
                </Flex>
              </div>

              {isNewsCustom && (
                <div style={{ width: '100%', padding: 4, border: '1px dashed #222', borderRadius: 4 }}>
                  <div className="repeater-items numerations-items" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                    {items.map((item, index) => (
                      <div key={index} className="repeater-item numerations-item">
                        <div className="items-control">
                          <div className="items-control__buttons">
                            <Button onClick={() => itemsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                            <Button onClick={() => itemsList.moveDown(index)} disabled={index === items.length - 1} style={{ opacity: index === (items.length - 1) ? 0.4 : 1 }}>➡️</Button>
                          </div>
                          <Button isDestructive onClick={() => itemsList.remove(index)}>❌</Button>
                        </div>

                        {itemsList.renderBlockNews(item, index)}
                      </div>
                    ))}
                  </div>

                  <div style={{ height: 12 }} />

                  <Button
                    onClick={() => itemsList.add({ image: '', content: '', link: '', date: '' })}
                    className="add-repeater-item"
                    style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
                  >
                    {__('+ Добавить элемент', 'theme')}
                  </Button>
                </div>
              )}

              <Flex className="advanced-block-buttons">
                <FlexBlock className="advanced-block-button">
                  <label className="my-rich-text__label">Кнопка - текст</label>
                  <RichText
                    tagName="div"
                    value={buttonText}
                    onChange={(value) => setAttributes({ buttonText: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
                <FlexBlock className="advanced-block-button">
                  <label className="my-rich-text__label">Кнопка - ссылка</label>
                  <URLInput
                    value={buttonLink}
                    onChange={(value) => setAttributes({ buttonLink: value })}
                    placeholder={__('Введите название страницы или url', 'theme')}
                  />
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
