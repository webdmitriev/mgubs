import { useBlockProps, RichText } from '@wordpress/block-editor';

// import telegramIcon from '../assets/img/icons/icon-telegram-black.svg';
import telegramIcon from '../../../../assets/img/icons/icon-telegram-black.svg';
import vkIcon from '../../../../assets/img/icons/icon-vk-black.svg';
import youtubeIcon from '../../../../assets/img/icons/icon-youtube-black.svg';
import whatsappIcon from '../../../../assets/img/icons/icon-whatsapp-black.svg';

import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { anchor, bgc,
    title, descr, buttonText, buttonLink,
    widgetTitle, widgetSocials, widgetImageId, widgetImageData,
    posts } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-07',
    style: { backgroundColor: bgc || 'transparent' },
    id: anchor || '',
  });

  return (
    <div {...blockProps}>
      <div className="container df-sp-fs">
        <div className="block-content">
          {title && (
            <RichText.Content
              tagName="h2"
              value={title}
              className="h2"
            />
          )}
          {descr && (
            <RichText.Content
              tagName="p"
              value={descr}
              className="descr"
            />
          )}
          {buttonLink && (<a href={buttonLink} className="link link-white">{buttonText}</a>)}
        </div>
        <div className="block-widgets">
          <div className="block-widget df-ce-fs">
            {widgetTitle && (
              <RichText.Content
                tagName="h2"
                value={widgetTitle}
                className="h2"
              />
            )}
            {widgetSocials?.map((social, index) => {
              return (
                social.link && (
                  <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                    {social.imageName === 'telegram' && <img src={telegramIcon} alt={social.imageName} />}
                    {social.imageName === 'vk' && <img src={vkIcon} alt={social.imageName} />}
                    {social.imageName === 'youtube' && <img src={youtubeIcon} alt={social.imageName} />}
                    {social.imageName === 'whatsapp' && <img src={whatsappIcon} alt={social.imageName} />}
                  </a>
                )
              )
            })}
          </div>
          <Picture data={widgetImageData} className="block-widget-image" />
        </div>
        <div className="block-articles">
          {posts.map((post, index) => (
            <div key={index} className="block-article">
              {post.text && (
                <>
                  <RichText.Content
                    tagName="h3"
                    value={post.text}
                    className="h3"
                  />
                  {post.link && (<a href={post.link} className="link link-white">Подробнее</a>)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
