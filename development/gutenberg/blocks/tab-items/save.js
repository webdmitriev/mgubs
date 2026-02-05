import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { title } = attributes;
  const blockProps = useBlockProps.save({
    className: 'tab-panel-item',
    'data-tab-title': title || ''
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}

export default Save;