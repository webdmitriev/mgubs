import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-26.jpg';

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
    className: 'block-style mgu-advantages'
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
            <span className="block-info-title">🎨 Block 26 - События (детальнее)</span>
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
              <div className="advanced-block-text">
                <>
                  <label className="my-rich-text__label">Заголовок</label>
                  <RichText
                    tagName="div"
                    label="Заголовок"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
              </div>

              <div style={{ height: '24px' }} />

              <div className="repeater-items" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                {items.map((item, index) => (
                  <div key={index} className="repeater-item">
                    <div className="items-control" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="items-control__buttons">
                        <Button onClick={() => itemsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                        <Button onClick={() => itemsList.moveDown(index)} disabled={index === items.length - 1} style={{ opacity: index === (items.length - 1) ? 0.4 : 1 }}>➡️</Button>
                      </div>
                      <Button isDestructive onClick={() => itemsList.remove(index)}>❌</Button>
                    </div>

                    {itemsList.renderBlockTwentyFine(item, index)}
                  </div>
                ))}
              </div>
              <Button
                onClick={() => itemsList.add({ image: '', title: '', subTitle: '', content: '', link: '' })}
                className="add-repeater-item"
                style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid rgba(0, 124, 186, 0.5)' }}
              >
                {__('+ Добавить элемент', 'theme')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;