import { useState, useRef, useEffect } from '@wordpress/element';

export default function ColorSelect({ colors, value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    { label: "Прозрачный / удалить цвет", value: "", theme: '' },
    ...colors.map(c => ({ label: c.name, value: c.color, theme: c.theme })),
  ];

  const selectedOption = options.find(o => o.value === value) || options[0];
  console.log(selectedOption);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colorBoxStyle = (color) => ({
    width: 28,
    height: 22,
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: color || "transparent",
    backgroundImage: color
      ? "none"
      : `linear-gradient(45deg, #eee 25%, transparent 25%),
               linear-gradient(-45deg, #eee 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, #eee 75%),
               linear-gradient(-45deg, transparent 75%, #eee 75%)`,
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
    boxSizing: "border-box",
  });

  return (
    <div ref={ref} style={{ marginBottom: 18, position: "relative" }}>
      {/* Label */}
      {label && (
        <div style={{
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 6,
          color: "#1e1e1e",
        }}>
          {label}
        </div>
      )}

      {/* Select head */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 10px",
          border: "1px solid #ccc",
          borderRadius: 6,
          cursor: "pointer",
          background: "#fff",
          userSelect: "none",
        }}
      >
        <div style={colorBoxStyle(selectedOption.value)} />
        <span>{selectedOption.label}</span>
        <div style={{ marginLeft: "auto" }}>▾</div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            zIndex: 9999,
            maxHeight: 250,
            overflowY: "auto",
          }}
        >
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => {
                onChange(option.value, option.theme);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                cursor: "pointer",
                background:
                  option.value === value ? "#f0f0f0" : "transparent",
              }}
            >
              <div style={colorBoxStyle(option.value)} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
