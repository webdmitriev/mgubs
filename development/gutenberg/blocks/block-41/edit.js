import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-41.jpg';

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
    postType: 'success',
    selectedIds: selectedPosts,
    mapItem: (post) => ({
      id: post.id,
      title: post.title.rendered,
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
            <span className="block-info-title">🎨 Block 41 - Истории успеха</span>
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
                title="Добавить"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                searchQuery={selector.searchQuery}
                setSearchQuery={selector.setSearchQuery}
                isSearching={selector.isSearching}
                results={selector.searchResults}
                onSelect={addItem}
              />

              {/* Рендер карточек */}
              {selector.items.length === 0 ? (
                <div style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '40px',
                  border: '2px dashed #ddd',
                  borderRadius: '5px'
                }}>
                  <p style={{ color: '#999' }}>
                    {__('Нажмите "Выбрать", чтобы добавить в список', 'theme')}
                  </p>
                </div>
              ) : (
                <div className="repeater-items" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                  {selector.items.map(item => (
                    <div key={item.id} className="repeater-item">
                      <div>{item.title}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ height: 24 }} />

              <Button isPrimary onClick={() => setIsOpen(true)}>Выбрать</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;