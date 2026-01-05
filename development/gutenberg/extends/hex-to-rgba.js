const HexToRgba = (hex, alpha = 1) => {
  if (!hex) return null;

  let cleanHex = hex.replace('#', '');

  // поддержка короткого HEX (#fff)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map(c => c + c)
      .join('');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default HexToRgba