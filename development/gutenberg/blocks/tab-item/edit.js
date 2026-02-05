import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { InspectorControls, PanelBody, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const Edit = ({ attributes, setAttributes }) => {
  const { title = '' } = attributes;

  const blockProps = useBlockProps({
    className: 'tab-panel-item'
  });

  const innerBlocksProps = useInnerBlocksProps({
    className: 'tab-inside-content'
  });

  return (
    <div {...blockProps}>
      <div>Заголовок: {title}</div>
      <div {...innerBlocksProps} />
    </div>
  );
}

export default Edit;