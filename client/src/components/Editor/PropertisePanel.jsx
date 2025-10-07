// src/components/Editor/PropertiesPanel.jsx
export default function PropertiesPanel({ selectedElement, onChange }) {
  if (!selectedElement) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      onChange(name, checked);
    } else if (name === "fontSize" || name === "width" || name === "height" || name === "rotation" || name === "letterSpacing" || name === "lineHeight" || name === "opacity" || name === "borderRadius") {
      onChange(name, parseFloat(value));
    } else {
      onChange(name, value);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 w-64 overflow-y-auto">
      <h2 className="font-bold mb-2">Properties</h2>

      {/* Text properties */}
      {selectedElement.type === "text" && (
        <>
          <label className="block text-sm">Text</label>
          <input
            type="text"
            name="text"
            value={selectedElement.text}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Font Size</label>
          <input
            type="number"
            name="fontSize"
            value={selectedElement.fontSize}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Font Family</label>
          <select
            name="fontFamily"
            value={selectedElement.fontFamily || "Arial"}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          >
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            <option>Georgia</option>
            <option>Verdana</option>
          </select>

          <label className="block text-sm">Bold / Italic</label>
          <div className="flex gap-2 mb-2">
            <label>
              <input
                type="checkbox"
                name="bold"
                checked={selectedElement.bold || false}
                onChange={handleChange}
              /> Bold
            </label>
            <label>
              <input
                type="checkbox"
                name="italic"
                checked={selectedElement.italic || false}
                onChange={handleChange}
              /> Italic
            </label>
          </div>

          <label className="block text-sm">Alignment</label>
          <select
            name="align"
            value={selectedElement.align || "left"}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          <label className="block text-sm">Letter Spacing</label>
          <input
            type="number"
            name="letterSpacing"
            value={selectedElement.letterSpacing || 0}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Line Height</label>
          <input
            type="number"
            name="lineHeight"
            value={selectedElement.lineHeight || 1.2}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </>
      )}

      {/* Rectangle & Image properties */}
      {(selectedElement.type === "rectangle" || selectedElement.type === "image") && (
        <>
          <label className="block text-sm">Width</label>
          <input
            type="number"
            name="width"
            value={selectedElement.width}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Height</label>
          <input
            type="number"
            name="height"
            value={selectedElement.height}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Rotation (°)</label>
          <input
            type="number"
            name="rotation"
            value={selectedElement.rotation || 0}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Opacity</label>
          <input
            type="number"
            name="opacity"
            value={selectedElement.opacity || 1}
            step="0.1"
            min="0"
            max="1"
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <label className="block text-sm">Border Radius</label>
          <input
            type="number"
            name="borderRadius"
            value={selectedElement.borderRadius || 0}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded mb-2"
          />

          <div className="flex gap-2">
            <label>
              <input
                type="checkbox"
                name="flipX"
                checked={selectedElement.flipX || false}
                onChange={handleChange}
              /> Flip Horizontal
            </label>
            <label>
              <input
                type="checkbox"
                name="flipY"
                checked={selectedElement.flipY || false}
                onChange={handleChange}
              /> Flip Vertical
            </label>
          </div>
        </>
      )}

      {/* Common fill color */}
      <label className="block text-sm mt-2">Color</label>
      <input
        type="color"
        name="fill"
        value={selectedElement.fill || "#000000"}
        onChange={handleChange}
        className="w-full h-10 p-0 border mb-2 rounded"
      />
    </div>
  );
}
