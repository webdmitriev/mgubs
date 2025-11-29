import { useEffect } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';

export default function AnchorField({ value, onChange }) {

  // Генерация ID только при отсутствии значения
  useEffect(() => {
    if (!value) {
      const newId = Array(12)
        .fill(0)
        .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
        .join('');
      onChange(newId);
    }
  }, []);

  const copyToClipboard = () => {
    if (value) navigator.clipboard.writeText(value);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <TextControl
        label="Якорь дял скролла"
        value={value}
        style={{ height: 36 }}
        readOnly
      />
      <Button variant="secondary" onClick={copyToClipboard}>
        Копировать
      </Button>
    </div>
  );
}
