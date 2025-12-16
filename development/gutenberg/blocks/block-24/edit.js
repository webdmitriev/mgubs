import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import blockImage from '../../../../admin/assets/img/blocks/block-24.jpg';

import PictureBgEdit from '../../components/PictureBgEdit';

import VideoHelpPanel from './controls/VideoHelpPanel';
import ContentPanel from './controls/ContentPanel';
import BgAnchorPanel from './controls/BgAnchorPanel';

const Edit = ({ attributes, setAttributes }) => {
  const { title, titleSecond, descr } = attributes;

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
            <span className="block-info-title">🎨 Block 24 - Заглавный блок</span>
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
                <>
                  <label className="my-rich-text__label">Заголовок (справа)</label>
                  <RichText
                    tagName="div"
                    label="Заголовок (справа)"
                    value={titleSecond}
                    onChange={(value) => setAttributes({ titleSecond: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
                <>
                  <label className="my-rich-text__label">Описание (справа)</label>
                  <RichText
                    tagName="div"
                    label="Описание (справа)"
                    value={descr}
                    onChange={(value) => setAttributes({ descr: value })}
                    placeholder={__('Текст...', 'theme')}
                    allowedFormats={[]}
                  />
                </>
              </div>

              <div style={{ height: '24px' }} />

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