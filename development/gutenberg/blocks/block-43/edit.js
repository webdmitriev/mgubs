import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import { ToggleControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-43.jpg';

import PictureBgEdit from '../../components/PictureBgEdit';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, descr, isBlockLine, buttonText, buttonLink, isHideSecondBlock } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const bgSizes = [1920, 991, 576];

  // Handler - bg
  const getOnSelectBg = (size) => (media) => {
    setAttributes({
      [`bg${size}Id`]: media.id,
      [`bg${size}Data`]: {
        url: media.url,
        alt: media.alt || '',
        responsive: media.responsive || {
          webp: '',
          jpg: '',
          default: media.url,
        },
      },
    });
  };

  const getOnRemoveBg = (size) => () => {
    setAttributes({
      [`bg${size}Id`]: 0,
      [`bg${size}Data`]: {
        url: '',
        alt: '',
        responsive: {
          webp: '',
          jpg: '',
          default: '',
        },
      },
    });
  };

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
            <span className="block-info-title">🎨 Block 43 - Главный блок (с датой события)</span>
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
                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Заголовок</label>
                    <RichText
                      tagName="div"
                      value={title}
                      onChange={(value) => setAttributes({ title: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexItem>
                    <label htmlFor="rich-title" className="my-rich-text__label">Линия между блоками</label>
                    <ToggleControl
                      label={isBlockLine ? __('Добавить линию ✅', 'theme') : __('Убрать линию ❌', 'theme')}
                      checked={isBlockLine}
                      onChange={(value) => setAttributes({ isBlockLine: value })}
                    />
                  </FlexItem>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Описание</label>
                    <RichText
                      tagName="div"
                      value={descr}
                      onChange={(value) => setAttributes({ descr: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    />
                  </FlexBlock>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexBlock>
                    <label className="my-rich-text__label">Кнопка - текст</label>
                    <RichText
                      tagName="div"
                      label="Подзаголовок"
                      value={buttonText}
                      onChange={(value) => setAttributes({ buttonText: value })}
                      placeholder={__('Текст...', 'theme')}
                      allowedFormats={[]}
                    />
                  </FlexBlock>
                  <FlexItem>
                    <label className="my-rich-text__label">Кнопка - ссылка</label>
                    <URLInput
                      value={buttonLink}
                      onChange={(value) => setAttributes({ buttonLink: value })}
                      placeholder={__('URL...', 'theme')}
                    />
                  </FlexItem>
                </Flex>

                <div style={{ height: 14 }} />

                <Flex>
                  <FlexItem>
                    <label htmlFor="rich-title" className="my-rich-text__label">Блок справа:</label>
                    <ToggleControl
                      label={isHideSecondBlock ? __('Показать ✅', 'theme') : __('Убрать ❌', 'theme')}
                      checked={isHideSecondBlock}
                      onChange={(value) => setAttributes({ isHideSecondBlock: value })}
                    />
                  </FlexItem>
                </Flex>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', rowGap: '16px', columnGap: '16px', width: '100%' }}>
                {bgSizes.map((size) => (
                  <PictureBgEdit
                    key={size}
                    label={`Фон ${size}px`}
                    imageId={attributes[`bg${size}Id`]}
                    imageData={attributes[`bg${size}Data`]}
                    onSelect={getOnSelectBg(size)}
                    onRemove={getOnRemoveBg(size)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
