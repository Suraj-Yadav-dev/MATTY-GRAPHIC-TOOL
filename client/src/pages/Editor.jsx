import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDesign, updateDesign as updateDesignRedux } from "../redux/designSlice";
import designService from "../services/designService";

import Toolbar from "../components/Editor/Toolbar";
import CanvasEditor from "../components/Editor/CanvasEditor";
import LayerPanel from "../components/Editor/LayerPanel";
import SidebarTemplates from "../components/Editor/SidebarTemplates";
import PropertiesPanel from "../components/Editor/PropertisePanel";

import jsPDF from "jspdf";
import { FiDownload, FiUpload, FiSave } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

export default function EditorPage() {
  const [selectedTool, setSelectedTool] = useState("select");
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [designTitle, setDesignTitle] = useState("");

  const stageRef = useRef(); 

  const location = useLocation();
  const templateSrc = location.state?.templateSrc;
  const dispatch = useDispatch();
  const { selectedDesign } = useSelector((state) => state.design);

  const selectedElement = elements.find((el) => el.id === selectedElementId) || null;

  // ---------- Load template if passed ----------
  useEffect(() => {
    if (!templateSrc) return;
    handleAddElement({
      type: "image",
      src: templateSrc,
      width: 600,
      height: 400,
      fill: "#ffffff",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateSrc]);

  // ---------- Load selected design ----------
  useEffect(() => {
    if (!selectedDesign) return;
    setElements(selectedDesign.jsonData || []);
    setDesignTitle(selectedDesign.title || "");
  }, [selectedDesign]);

  // ---------- History Management ----------
  const pushHistory = (newElements) => {
    setHistory([...history, elements]);
    setRedoStack([]);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setRedoStack([elements, ...redoStack]);
    setElements(prev);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack[0];
    setHistory([...history, elements]);
    setElements(next);
    setRedoStack(redoStack.slice(1));
  };

  // ---------- Element Actions ----------
  const handleUpdateProperty = (name, value) => {
    if (!selectedElementId) return;
    const newElements = elements.map((el) =>
      el.id === selectedElementId
        ? {
            ...el,
            [name]:
              ["fontSize", "width", "height", "lineHeight"].includes(name)
                ? parseFloat(value)
                : value,
          }
        : el
    );
    pushHistory(newElements);
  };

  const handleDelete = () => {
    if (!selectedElementId) return;
    const newElements = elements.filter((el) => el.id !== selectedElementId);
    setSelectedElementId(null);
    pushHistory(newElements);
  };

  // ---------- Sidebar Elements ----------
  const sidebarElements = [
    { id: "el1", name: "Red Square", type: "rectangle", width: 100, height: 100, fill: "#ff0000" },
    { id: "el2", name: "Heading Text", type: "text", text: "New Text", fontSize: 24, fill: "#000000" },
    { id: "el3", name: "Sample Image", type: "image", src: "https://picsum.photos/150", width: 150, height: 150 },
  ];

  const handleAddElement = (el, dropPosition = { x: 100, y: 100 }) => {
    const id = `${el.type}-${Date.now()}`;
    const newEl = {
      ...el,
      id,
      x: dropPosition.x || el.x || 50,
      y: dropPosition.y || el.y || 50,
      rotation: el.rotation || 0,
      opacity: el.opacity ?? 1,
      borderRadius: el.borderRadius ?? 0,
      flipX: el.flipX ?? false,
      flipY: el.flipY ?? false,
    };
    pushHistory([...elements, newEl]);
    setSelectedElementId(id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const elData = JSON.parse(e.dataTransfer.getData("element"));
    const stageBox = stageRef.current.getStage().container().getBoundingClientRect();
    const x = e.clientX - stageBox.left;
    const y = e.clientY - stageBox.top;
    handleAddElement(elData, { x, y });
  };

  const handleDragOver = (e) => e.preventDefault();

  // ---------- Export ----------
  const handleExport = (format = "png") => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
    if (format === "png") {
      const link = document.createElement("a");
      link.download = "design.png";
      link.href = dataURL;
      link.click();
    } else if (format === "pdf") {
      const img = new Image();
      img.src = dataURL;
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "l" : "p",
          unit: "px",
          format: [img.width, img.height],
        });
        pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
        pdf.save("design.pdf");
      };
    }
  };

  // ---------- Save / Update ----------
  const handleSaveToBackend = async () => {
    if (!elements.length) return alert("No elements to save!");
    if (!stageRef.current) return alert("Canvas not ready!");

    try {
      const thumbnailDataUrl = stageRef.current.toDataURL({ pixelRatio: 0.5 });
      const payload = {
        title: designTitle || `Design-${Date.now()}`,
        jsonData: elements,
        thumbnailUrl: thumbnailDataUrl,
      };

      if (selectedDesign?._id) {
        const updated = await designService.updateDesign(selectedDesign._id, payload);
        dispatch(updateDesignRedux(updated));
        alert("Design updated successfully!");
      } else {
        const created = await designService.createDesign(payload);
        dispatch(addDesign(created));
        alert("Design saved successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save design: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden ml-13">
      {/* ---------- Left Sidebar ---------- */}
      <div className="w-64 p-3 border-r bg-white overflow-y-auto flex flex-col justify-between">
        <SidebarTemplates elementsList={sidebarElements} onAddElement={handleAddElement} />
        <div className="border-t my-3" />

        <div className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Design title"
            value={designTitle}
            onChange={(e) => setDesignTitle(e.target.value)}
            className="p-1 border rounded w-full"
          />
        </div>
      </div>

      {/* ---------- Floating Left Icon Toolbar ---------- */}
      <div className="fixed top-1/2 left-0 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        <button
          onClick={handleSaveToBackend}
          className="w-12 h-12 bg-gray-300 hover:bg-yellow-600 text-white rounded-tr-xl rounded-br-xl flex items-center justify-center shadow-lg"
          title={selectedDesign?._id ? "Update Design" : "Save Design"}
        >
          <FiSave size={24} />
        </button>

        <label
          title="Upload Image"
          className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-tr-xl rounded-br-xl flex items-center justify-center cursor-pointer shadow-lg"
        >
          <FiUpload size={24} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                handleAddElement({
                  type: "image",
                  src: reader.result,
                  width: 150,
                  height: 150,
                  name: file.name,
                });
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>

        <button
          title="Export as PNG"
          onClick={() => handleExport("png")}
          className="w-12 h-12 bg-gray-300 hover:bg-blue-600 text-white rounded-tr-xl rounded-br-xl flex items-center justify-center shadow-lg"
        >
          <FiDownload size={24} />
        </button>

        <button
          title="Export as PDF"
          onClick={() => handleExport("pdf")}
          className="w-12 h-12 bg-gray-300 hover:bg-green-600 text-white rounded-tr-xl rounded-br-xl flex items-center justify-center shadow-lg"
        >
          <FaFilePdf size={24} />
        </button>
      </div>

      {/* ---------- Center Canvas ---------- */}
      <div
        className="flex-1 flex flex-col p-4 overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Toolbar
          onSelectTool={setSelectedTool}
          onDelete={handleDelete}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onAdjust={() => alert("Open properties panel")}
          selectedColor={selectedElement?.fill?.startsWith("#") ? selectedElement.fill : "#ff0000"}
          onChangeColor={(color) => handleUpdateProperty("fill", color)}
          selectedFontSize={selectedElement?.fontSize || 20}
          onChangeFontSize={(size) => handleUpdateProperty("fontSize", size)}
        />

        <div className="flex-1 overflow-auto">
          <CanvasEditor
            ref={stageRef}
            selectedTool={selectedTool}
            elements={elements}
            setElements={pushHistory}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
          />
        </div>
      </div>

      {/* ---------- Right Sidebar ---------- */}
      <div className="w-64 p-2 flex flex-col gap-4 border-l bg-white overflow-y-auto">
        <PropertiesPanel selectedElement={selectedElement} onChange={handleUpdateProperty} />
        <LayerPanel elements={elements} onSelect={(id) => setSelectedElementId(id)} />
      </div>
    </div>
  );
}
