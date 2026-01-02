import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-31.jpg';

import { usePostTypeSelector } from '../../post-type-selector/usePostTypeSelector';
import PostTypeSelectorModal from '../../post-type-selector/PostTypeSelectorModal';
import { useAttributeList } from '../../hooks/useAttributeList';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    teacherName, teacherPosition, teacherDescr, teacherImageId, teacherImageData
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const teachers = useAttributeList(attributes, setAttributes, 'teachers');

  // Handler - teacher
  const onSelectImage = (media) => {
    setAttributes({
      teacherImageId: media.id,
      teacherImageData: {
        url: media.url,
        alt: media.alt || '',
        responsive: media.responsive || {
          webp: '',
          jpg: '',
          default: media.url,
        }
      }
    });
  };

  const onRemoveImage = () => {
    setAttributes({
      teacherImageId: 0,
      teacherImageData: {
        url: '',
        alt: '',
        responsive: {
          webp: '',
          jpg: '',
          default: '',
        }
      }
    });
  };

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
            <span className="block-info-title">🎨 Block 31 - Преподаватели (иерархия)</span>
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
            <div className="advanced-block-content" style={{ alignItems: "flex-start", alignContent: 'flex-start' }}>

              <h3 style={{ width: '100%', margin: '0' }}>Заглавный преподаватель:</h3>
              <div style={{ width: '100%', padding: '12px', border: '2px dashed rgba(0,124,186,.25)', borderRadius: '4px' }}>
                <Flex align="flex-start">
                  <FlexBlock>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={['image']}
                        value={teacherImageId}
                        render={({ open }) => (
                          <div className="advanced-block-image advanced-block-image-100">
                            <div className="label-image">Фотография</div>
                            {teacherImageData.url ? (
                              <>
                                <img
                                  src={teacherImageData.url}
                                  className="advanced-image-preview"
                                  alt=""
                                  style={{ borderRadius: '8px' }}
                                />
                                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                  <Button onClick={open} variant="secondary" size="small">
                                    ✏️ {__('Изменить', 'theme')}
                                  </Button>
                                  <Button
                                    onClick={onRemoveImage}
                                    variant="tertiary"
                                    size="small"
                                    isDestructive
                                  >
                                    🗑 {__('Удалить', 'theme')}
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <Button onClick={open} variant="primary">
                                📷 {__('Добавить картинку', 'theme')}
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </MediaUploadCheck>
                  </FlexBlock>
                  <FlexBlock>
                    <>
                      <label className="my-rich-text__label">Имя</label>
                      <RichText
                        tagName="div"
                        label="Имя"
                        value={teacherName}
                        onChange={(value) => setAttributes({ teacherName: value })}
                        placeholder={__('Текст...', 'theme')}
                        allowedFormats={[]}
                      />
                    </>
                    <>
                      <label className="my-rich-text__label">Роль</label>
                      <RichText
                        tagName="div"
                        label="Роль"
                        value={teacherPosition}
                        onChange={(value) => setAttributes({ teacherPosition: value })}
                        placeholder={__('Текст...', 'theme')}
                        allowedFormats={[]}
                      />
                    </>
                    <>
                      <label className="my-rich-text__label">Описание</label>
                      <RichText
                        tagName="div"
                        label="Описание"
                        value={teacherDescr}
                        onChange={(value) => setAttributes({ teacherDescr: value })}
                        placeholder={__('Текст...', 'theme')}
                        allowedFormats={[]}
                      />
                    </>
                  </FlexBlock>
                </Flex>
              </div>

              <div style={{ display: 'block', width: '100%', height: '2px' }}></div>

              <h3 style={{ width: '100%', margin: '0' }}>Остальные преподаватели:</h3>
              <div style={{ width: '100%', padding: '12px', border: '2px dashed rgba(0,124,186,.25)', borderRadius: '4px' }}>
                <div className="teachers-block-grid contacts-items numerations-items numerations-items-02">
                  {teachers.list.map((item, index) => (
                    <div key={index} className="repeater-item">
                      <Button onClick={() => teachers.moveUp(index)}>⬆</Button>
                      <Button onClick={() => teachers.moveDown(index)}>⬇</Button>
                      <Button isDestructive onClick={() => teachers.remove(index)}>❌</Button>

                      <TeacherRepeaterItem
                        item={item}
                        index={index}
                        onChange={teachers.update}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ height: 12 }} />
                <Button
                  onClick={() => teachers.add({ selectedIds: [] })}
                >
                  + Добавить элемент
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;

const TeacherRepeaterItem = ({ item, index, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selector = usePostTypeSelector({
    postType: 'teachers',
    selectedIds: item.selectedIds || [],
  });

  const addTeacher = (id) => {
    onChange(index, {
      selectedIds: [...item.selectedIds || [], id],
    });
    setIsOpen(false);
  };

  return (
    <>
      <PostTypeSelectorModal
        title="Добавить преподавателя"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        results={selector.searchResults}
        onSelect={addTeacher}
      />

      {selector.items.length === 0 ? (
        <div className="empty">
          Нажмите «Выбрать преподавателя»
        </div>
      ) : (
        <div className="grid">
          {selector.items.map((teacher) => (
            <div key={teacher.id}>
              {teacher.name}
              <Button
                isSmall
                isDestructive
                onClick={() =>
                  onChange(index, {
                    selectedIds: item.selectedIds.filter(id => id !== teacher.id),
                  })
                }
              >
                ✕
              </Button>
            </div>
          ))}

        </div>
      )}

      <Button isPrimary onClick={() => setIsOpen(true)}>
        Выбрать преподавателя
      </Button>
    </>
  );
};