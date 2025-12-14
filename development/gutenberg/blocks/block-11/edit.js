import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Flex, FlexBlock, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-11.jpg';

import PictureBgEdit from '../../components/PictureBgEdit';
import CF7FormSelector from '../../components/CF7FormSelector';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, subTitleOne, subTitleTwo, divider, descr } = attributes;

  const [isPreview, setIsPreview] = useState(false);

  const blockProps = useBlockProps({
    className: 'block-style block-11'
  });

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

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

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
              <Flex
                direction={[
                  'column',
                  'row'
                ]}
                align="flex-start">
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

              <Flex direction={[
                'column',
                'row'
              ]}>
                <FlexBlock>
                  <span>{__('Описание', 'theme')}</span>
                  <RichText
                    tagName="div"
                    value={descr}
                    onChange={(value) => setAttributes({ descr: value })}
                    placeholder={__('Описание...', 'theme')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/underline', 'core/text-color']}
                  />
                </FlexBlock>
              </Flex>

              <Flex direction={[
                'column',
                'row'
              ]}>
                <FlexBlock>
                  <CF7FormSelector attributes={attributes} setAttributes={setAttributes} />
                </FlexBlock>
              </Flex>

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