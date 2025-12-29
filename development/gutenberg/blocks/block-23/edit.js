import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-23.jpg';

import { usePostTypeSelector } from '../../post-type-selector/usePostTypeSelector';
import PostTypeSelectorModal from '../../post-type-selector/PostTypeSelectorModal';

import VideoHelpPanel from './controls/VideoHelpPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { selectedPosts = [] } = attributes;
  const [isOpen, setIsOpen] = useState(false);

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const selector = usePostTypeSelector({
    postType: 'manager',
    selectedIds: selectedPosts,
    mapItem: (post) => ({
      id: post.id,
      name: post.title.rendered,
      role: post.meta?.role || '',
      imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      imageId: post._embedded?.['wp:featuredmedia']?.[0]?.id || 0,
    }),
  });

  const addItem = (id) => {
    setAttributes({
      selectedPosts: [...selectedPosts, id],
    });
    setIsOpen(false);
    selector.setSearchQuery('');
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
            <span className="block-info-title">🎨 Block 23 - Managers</span>
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
              <PostTypeSelectorModal
                title="Добавить менедржера"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                searchQuery={selector.searchQuery}
                setSearchQuery={selector.setSearchQuery}
                isSearching={selector.isSearching}
                results={selector.searchResults}
                onSelect={addItem}
              />

              {/* Рендер карточек */}
              {selector.items.length === 0 && (<div>Нет выбранных менеджеров.</div>)}

              <div className="repeater-items" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                {selector.items.map(item => (
                  <div key={item.id} className="repeater-item">
                    <div>{item.name}</div>
                    <div style={{ fontSize: 14, color: '#525252' }}>{item.role}</div>
                    <div style={{ height: 12 }} />
                    <img style={{ width: '100%', height: 240, objectFit: 'cover' }} src={item.imageUrl || ''} alt="Manager" />
                  </div>
                ))}
              </div>

              <div style={{ height: 24 }} />

              <Button isPrimary onClick={() => setIsOpen(true)}>Добавить</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;