import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ToggleControl, Flex, FlexBlock } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-31.jpg';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { teacherName, teacherPosition, teacherDescr, teacherImageId, teacherImageData, teachers } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const updateTeachers = (newTeachers) => {
    setAttributes({ teachers: newTeachers });
  };

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

  // teachers block props
  const addTeacherBlock = () => {
    updateTeachers([
      ...teachers,
      { title: '', items: [] }
    ]);
  };

  const removeTeacherBlock = (blockIndex) => {
    const newTeachers = [...teachers];
    newTeachers.splice(blockIndex, 1);
    updateTeachers(newTeachers);
  };

  const addTeacher = (blockIndex) => {
    const newTeachers = [...teachers];
    newTeachers[blockIndex].items.push({
      name: '',
      imageId: 0,
      imageData: {}
    });
    updateTeachers(newTeachers);
  };

  const removeTeacher = (blockIndex, index) => {
    const newTeachers = [...teachers];
    newTeachers[blockIndex].items.splice(index, 1);
    updateTeachers(newTeachers);
  };

  const moveTeacher = (blockIndex, index, direction) => {
    const items = [...teachers[blockIndex].items];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= items.length) return;

    [items[index], items[newIndex]] = [items[newIndex], items[index]];

    const newTeachers = [...teachers];
    newTeachers[blockIndex].items = items;
    updateTeachers(newTeachers);
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

              <h3 style={{ width: '100%', margin: '0' }}>Преподаватель:</h3>
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

              <h3 style={{ width: '100%', margin: '0' }}>Преподаватели:</h3>
              {teachers.map((block, blockIndex) => (
                <div
                  key={blockIndex}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginBottom: 16,
                    padding: 12,
                    border: '2px solid rgba(0,124,186,.3)',
                    borderRadius: 6
                  }}
                >
                  <Flex align="center">
                    <FlexBlock>
                      <label className="my-rich-text__label">Заголовок блока</label>
                      <RichText
                        tagName="div"
                        value={block.title}
                        onChange={(value) => {
                          const newTeachers = [...teachers];
                          newTeachers[blockIndex].title = value;
                          updateTeachers(newTeachers);
                        }}
                        placeholder="Например: Основной состав"
                        allowedFormats={[]}
                      />
                    </FlexBlock>

                    <Button
                      isDestructive
                      variant="tertiary"
                      onClick={() => removeTeacherBlock(blockIndex)}
                    >
                      🗑
                    </Button>
                  </Flex>

                  {/* преподаватели */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr',
                      columnGap: 8,
                      rowGap: 8,
                      marginTop: 12,
                      padding: 8,
                      border: '1px dashed rgba(0,0,0,.15)',
                      borderRadius: 4
                    }}
                  >
                    {block.items.map((teacher, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'block',
                          padding: 8,
                          border: '1px dashed rgba(0,0,0,.5)',
                          borderRadius: 4
                        }}
                      >
                        <div>
                          <Flex justify="flex-end" gap="8px">
                            <Button size="small" onClick={() => moveTeacher(blockIndex, index, -1)}>⬅️</Button>
                            <Button size="small" onClick={() => moveTeacher(blockIndex, index, 1)}>➡️</Button>
                            <Button
                              size="small"
                              isDestructive
                              onClick={() => removeTeacher(blockIndex, index)}
                            >
                              🗑
                            </Button>
                          </Flex>
                          <div style={{ height: 12 }} />
                          <Flex>
                            <FlexBlock>
                              <MediaUploadCheck>
                                <MediaUpload
                                  allowedTypes={['image']}
                                  value={teacher.imageId}
                                  onSelect={(media) => {
                                    const newTeachers = [...teachers];
                                    newTeachers[blockIndex].items[index].imageId = media.id;
                                    newTeachers[blockIndex].items[index].imageData = {
                                      url: media.url,
                                      alt: media.alt || ''
                                    };
                                    updateTeachers(newTeachers);
                                  }}
                                  render={({ open }) => (
                                    <>
                                      {teacher.imageData?.url ? (
                                        <img
                                          src={teacher.imageData.url}
                                          style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6 }}
                                          onClick={open}
                                        />
                                      ) : (
                                        <Button onClick={open} variant="secondary">
                                          📷 Фото
                                        </Button>
                                      )}
                                    </>
                                  )}
                                />
                              </MediaUploadCheck>
                            </FlexBlock>
                          </Flex>
                          <div style={{ height: 12 }} />
                          <Flex>
                            <FlexBlock>
                              <label className="my-rich-text__label">Имя</label>
                              <RichText
                                tagName="div"
                                value={teacher.name}
                                onChange={(value) => {
                                  const newTeachers = [...teachers];
                                  newTeachers[blockIndex].items[index].name = value;
                                  updateTeachers(newTeachers);
                                }}
                                placeholder="Имя преподавателя"
                                allowedFormats={[]}
                              />
                            </FlexBlock>
                          </Flex>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    style={{ marginTop: 8 }}
                    variant="secondary"
                    onClick={() => addTeacher(blockIndex)}
                  >
                    + Добавить преподавателя
                  </Button>
                </div>
              ))}

              <Button variant="primary" onClick={addTeacherBlock}>
                + Добавить блок
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;