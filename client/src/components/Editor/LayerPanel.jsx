// src/components/Editor/LayerPanel.jsx
export default function LayerPanel({ elements, onSelect }) {
  return (
    <div className="bg-white shadow rounded p-4 w-48 mb-4">
      <h2 className="font-bold mb-2">Layers</h2>
      {elements.length === 0 ? (
        <p className="text-gray-400 text-sm">No elements</p>
      ) : (
        <ul>
          {elements.map((el, idx) => (
            <li
              key={el.id}
              onClick={() => onSelect(el.id)}
              className="cursor-pointer p-1 hover:bg-gray-100 rounded"
            >
              {idx + 1}. {el.type} - {el.id.substring(0, 5)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
