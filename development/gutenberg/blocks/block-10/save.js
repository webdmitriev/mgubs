import { useBlockProps, RichText } from '@wordpress/block-editor';

import Picture from '../../components/picture';

const Save = ({ attributes }) => {
  const { title, subTitle, imageOneData, imageTwoData, contacts } = attributes;

  const blockProps = useBlockProps.save({
    className: 'block-standard block-10',
    id: 'contacts-block-id'
  });

  return (
    <div {...blockProps}>
      <div className="container df-sp-st">
        <RichText.Content
          tagName="h2"
          value={title}
          className="h2"
        />
        <RichText.Content
          tagName="p"
          value={subTitle}
          className="descr"
        />
        <Picture data={imageOneData} />
        <Picture data={imageTwoData} />

        <div className="contacts-items">
          {contacts.map((item, index) => (
            <div key={index} className="contacts-item">
              <RichText.Content
                tagName="div"
                value={item.label}
                className="contacts-item__label"
              />
              <RichText.Content
                value={item.content}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
