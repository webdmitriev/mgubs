import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { teachers = [], teachersOrder = [] } = attributes;

  return (
    <div {...useBlockProps.save()}>
      {/* Вставляем шорткод с выбранными ID */}
      {`[teachers_block ids="${teachersOrder.join(',')}"]`}
    </div>
  );
}
