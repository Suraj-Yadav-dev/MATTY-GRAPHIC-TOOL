// src/components/Editor/Toolbar.jsx
import { FaMousePointer, FaRegSquare, FaFont, FaImage, FaTrash, FaSlidersH, FaUndo, FaRedo } from "react-icons/fa";

export default function Toolbar({ onSelectTool, onDelete, onAdjust, onUndo, onRedo, onChangeColor, selectedColor, onChangeFontSize, selectedFontSize }) {
  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-50 p-3 rounded shadow mb-4 gap-3">

      {/* Left: Tools */}
      <div className="flex space-x-1">
        <button
          onClick={() => onSelectTool("select")}
          className="flex items-center gap-1 px-3 py-2 bg-white border rounded hover:bg-gray-100 transition"
        >
          <FaMousePointer /> Select
        </button>
        <button
          onClick={() => onSelectTool("rectangle")}
          className="flex items-center gap-1 px-3 py-2 bg-white border rounded hover:bg-gray-100 transition"
        >
          <FaRegSquare /> Rectangle
        </button>
        <button
          onClick={() => onSelectTool("text")}
          className="flex items-center gap-1 px-3 py-2 bg-white border rounded hover:bg-gray-100 transition"
        >
          <FaFont /> Text
        </button>
        <button
          onClick={() => onSelectTool("image")}
          className="flex items-center gap-1 px-3 py-2 bg-white border rounded hover:bg-gray-100 transition"
        >
          <FaImage /> Image
        </button>
      </div>

      {/* Middle: Formatting */}
      <div className="flex items-center space-x-2">
        {/* Color Picker */}
        <input
          type="color"
          value={selectedColor || "#000000"}
          onChange={(e) => onChangeColor(e.target.value)}
          className="w-10 h-10 p-0 border rounded cursor-pointer"
          title="Change Color"
        />

        {/* Font Size */}
        <input
          type="number"
          min={8}
          max={120}
          value={selectedFontSize || 20}
          onChange={(e) => onChangeFontSize(parseInt(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
          title="Font Size"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex space-x-1">
        <button
          onClick={onUndo}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 border rounded hover:bg-gray-300 transition"
          title="Undo"
        >
          <FaUndo /> Undo
        </button>
        <button
          onClick={onRedo}
          className="flex items-center gap-1 px-3 py-2 bg-gray-200 border rounded hover:bg-gray-300 transition"
          title="Redo"
        >
          <FaRedo /> Redo
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white border rounded hover:bg-red-600 transition"
        >
          <FaTrash /> Delete
        </button>
        <button
          onClick={onAdjust}
          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white border rounded hover:bg-blue-700 transition"
        >
          <FaSlidersH /> Adjust
        </button>
        
      </div>
    </div>
  );
}
