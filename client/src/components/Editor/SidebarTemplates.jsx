// src/components/Editor/SidebarTemplates.jsx
import { useState, useEffect } from "react";

export default function SidebarTemplates({ elementsList = [], templatesList = [], onAddElement }) {
  const [search, setSearch] = useState("");
  const [filteredElements, setFilteredElements] = useState(elementsList);

  useEffect(() => {
    setFilteredElements(
      elementsList.filter(el =>
        el.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, elementsList]);

  return (
    <div className="bg-white shadow rounded p-4 w-52 flex flex-col h-full">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search elements..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border px-2 py-1 rounded mb-4 text-sm"
      />

      {/* Elements Section */}
      <h2 className="font-bold mb-2 text-lg">Elements</h2>
      <div className="flex-1 overflow-y-auto mb-4">
        {filteredElements.length === 0 ? (
          <p className="text-gray-400 text-sm">No elements found</p>
        ) : (
          filteredElements.map(el => (
            <div
              key={el.id}
              draggable
              onDragStart={e => e.dataTransfer.setData("element", JSON.stringify(el))}
              onClick={() => onAddElement(el)}
              className="cursor-pointer border mb-2 p-2 rounded hover:bg-gray-50 text-center flex items-center justify-center gap-2"
            >
              {el.type === "text" ? el.text : el.name}
              {el.src && <img src={el.src} alt={el.name} className="w-6 h-6 object-contain" />}
            </div>
          ))
        )}
      </div>

      {/* Templates Section */}
      {templatesList && templatesList.length > 0 && (
        <>
          <h2 className="font-bold mb-2 text-lg">Templates</h2>
          <div className="flex-1 overflow-y-auto">
            {templatesList.map(tpl => (
              <div
                key={tpl.id}
                onClick={() => onAddElement(tpl)}
                className="cursor-pointer border mb-2 p-2 rounded hover:bg-gray-50 text-center"
              >
                {tpl.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
