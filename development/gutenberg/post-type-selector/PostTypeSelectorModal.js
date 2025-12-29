import { Modal, SearchControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PostTypeSelectorModal = ({
  title,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  isSearching,
  results,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <Modal title={title} onRequestClose={onClose}>
      <SearchControl
        label={__('Поиск', 'theme')}
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={__('Минимум 2 символа', 'theme')}
      />

      {isSearching && <Spinner />}

      {!isSearching && results.map(item => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          style={{
            padding: '10px',
            borderBottom: '1px solid #eee',
            cursor: 'pointer'
          }}
        >
          {item.label} <small>ID: {item.id}</small>
        </div>
      ))}
    </Modal>
  );
};

export default PostTypeSelectorModal;
