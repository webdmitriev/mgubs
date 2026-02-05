import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
  const { activeTab } = attributes;
  const blockProps = useBlockProps.save({
    className: 'custom-tabs-block',
    'data-active-tab': activeTab || 0
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}

export default Save;