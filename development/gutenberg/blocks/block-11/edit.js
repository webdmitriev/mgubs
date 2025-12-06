import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, Flex, FlexBlock, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-11.jpg';

import { useOptimizedMedia } from '../../utils/useOptimizedMedia';
import CF7FormSelector from '../../components/CF7FormSelector';

import { useAutoLinking } from '../../utils/useAutoLinking';
import AutoLinkingPanel from '../../utils/AutoLinkingPanel';
import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';

const Edit = ({ attributes, setAttributes }) => {
  const {
    title,
    subTitleOne,
    subTitleTwo,
    divider,
    descr,
    imageUrl,
    imageWebp,
    imageId,
    cf7FormId,
    cf7Shortcode
  } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const blockProps = useBlockProps({
    className: 'block-style block-11'
  });

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Используем хук авто-линкинга
  const { autoLinkContent, postsCount } = useAutoLinking();

  // Обработчик авто-линкинга
  const handleAutoLink = () => {
    autoLinkContent(attributes, setAttributes, ['subTitleOne', 'subTitleTwo', 'descr']);
  };

  // Handlers image
  const { onSelectImage } = useOptimizedMedia(setAttributes);
  const onRemoveImage = () => setAttributes({ imageUrl: '', imageWebp: '', imageId: 0 });

  return (
    <>
      <InspectorControls>
        <VideoHelpPanel />
        <ContentPanel attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <div className="advanced-block">
          <div className="block-info">
            <span className="block-info-title">🎨 Block 11 - Главный блок с формой</span>
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
              <Flex direction={[
                'column',
                'row'
              ]}>
                <FlexBlock>
                  <span>{__('Заголовок', 'theme')}</span>
                  <RichText
                    tagName="div"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Заголовок...', 'theme')}
                    allowedFormats={[]}
                  />
                </FlexBlock>
                <FlexBlock>
                  <span>{__('Подзаголовок 1', 'theme')}</span>
                  <RichText
                    tagName="div"
                    value={subTitleOne}
                    onChange={(value) => setAttributes({ subTitleOne: value })}
                    placeholder={__('Текст', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  />
                </FlexBlock>
              </Flex>

              <ToggleControl
                label={divider ? __('Убрать линию ❌', 'theme') : __('Добавить линию ✅', 'theme')}
                checked={divider}
                onChange={(value) => setAttributes({ divider: value })}
              />

              <Flex direction={[
                'column',
                'row'
              ]}>
                <FlexBlock>
                  <span>{__('Подзаголовок 2', 'theme')}</span>
                  <RichText
                    tagName="div"
                    value={subTitleTwo}
                    onChange={(value) => setAttributes({ subTitleTwo: value })}
                    placeholder={__('Текст', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                  />
                </FlexBlock>
              </Flex>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '16px' }}>
                <div className="advanced-block-images" style={{ display: 'block', width: '100%', maxWidth: '32%' }}>
                  <span>{__('Фоновая картинка', 'theme')}</span>
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={onSelectImage}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div className="advanced-block-image">
                          {imageUrl ? (
                            <>
                              <img src={imageUrl} alt="" style={{ borderRadius: '8px' }} />
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                <Button onClick={open} variant="secondary" size="small">✏️ {__('Заменить', 'theme')}</Button>
                                <Button onClick={onRemoveImage} variant="tertiary" size="small" isDestructive>🗑 {__('Удалить', 'theme')}</Button>
                              </div>
                            </>
                          ) : (
                            <Button onClick={open} variant="primary" style={{ overflow: 'hidden' }}>
                              📷 {__('Фоновая картинка', 'theme')}
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </MediaUploadCheck>
                </div>
                <div className="rich-text" style={{ display: 'block', width: '100%', maxWidth: '66%' }}>
                  <span>{__('Описание', 'theme')}</span>
                  <RichText
                    tagName="div"
                    value={descr}
                    onChange={(value) => setAttributes({ descr: value })}
                    placeholder={__('Описание...', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/underline', 'core/text-color']}
                  />
                </div>
              </div>
              <Flex direction={[
                'column',
                'row'
              ]}>
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