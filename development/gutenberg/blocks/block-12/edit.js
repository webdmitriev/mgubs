import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-12.jpg';

import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { breadcrumbs } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const breadcrumbsList = useAttributeList(attributes, setAttributes, 'breadcrumbs');

  const blockProps = useBlockProps({
    className: 'block-style'
  });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 12 - Breadcrumbs</span>
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
              <div className="repeater-items" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="repeater-item">
                    <div className="items-control" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="items-control__buttons">
                        <Button onClick={() => breadcrumbsList.moveUp(index)} disabled={index === 0} style={{ opacity: index === 0 ? 0.4 : 1 }}>⬅️</Button>
                        <Button onClick={() => breadcrumbsList.moveDown(index)} disabled={index === breadcrumbs.length - 1} style={{ opacity: index === (breadcrumbs.length - 1) ? 0.4 : 1 }}>➡️</Button>
                      </div>
                      <Button isDestructive onClick={() => breadcrumbsList.remove(index)}>❌</Button>
                    </div>

                    {breadcrumbsList.renderBreadcrumbs(item, index)}
                  </div>
                ))}
              </div>
              <Button
                onClick={() => breadcrumbsList.add({ text: '', link: '' })}
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