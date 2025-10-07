// src/components/Editor/CanvasEditor.jsx
import { Stage, Layer, Rect, Text, Image, Transformer } from "react-konva";
import { useRef, useEffect, useState, forwardRef } from "react";
import useImage from "use-image";

const CanvasEditor = forwardRef(
  ({ selectedTool, elements = [], setElements, selectedElementId, setSelectedElementId, selectedElement }, ref) => {
    const containerRef = useRef();
    const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
    const [transformerNode, setTransformerNode] = useState(null);

    // ---------- Responsive stage ----------
    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setStageSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ---------- Image component ----------
    const CanvasImage = ({ src, ...props }) => {
      const [img] = useImage(src);
      return <Image image={img} {...props} draggable />;
    };

    // ---------- Handle selection & transformer ----------
    useEffect(() => {
      if (!selectedElementId) return setTransformerNode(null);
      if (!ref?.current) return;
      const node = ref.current.findOne(`#${selectedElementId}`);
      setTransformerNode(node);
    }, [selectedElementId, elements, ref]);

    // ---------- Drag & transform ----------
    const handleDragTransform = (id, node) => {
      setElements(
        elements.map((el) => {
          if (el.id !== id) return el;

          const updated = {
            ...el,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            opacity: node.opacity(),
          };

          if (el.type === "rectangle" || el.type === "image") {
            updated.width = node.width() * node.scaleX();
            updated.height = node.height() * node.scaleY();
            updated.scaleX = 1;
            updated.scaleY = 1;
            updated.flipX = node.scaleX() < 0;
            updated.flipY = node.scaleY() < 0;
          }

          if (el.type === "text") {
            updated.width = node.width() * node.scaleX();
            updated.height = node.height() * node.scaleY();
            updated.scaleX = 1;
            updated.scaleY = 1;
          }

          return updated;
        })
      );
    };

    // ---------- Live property update ----------
    useEffect(() => {
      if (!selectedElement || !ref?.current) return;
      const node = ref.current.findOne(`#${selectedElement.id}`);
      if (!node) return;

      node.position({ x: selectedElement.x, y: selectedElement.y });
      node.rotation(selectedElement.rotation || 0);
      node.opacity(selectedElement.opacity || 1);

      if (selectedElement.type === "rectangle" || selectedElement.type === "image") {
        node.width(selectedElement.width);
        node.height(selectedElement.height);
        node.cornerRadius(selectedElement.borderRadius || 0);
        node.scaleX(selectedElement.flipX ? -1 : 1);
        node.scaleY(selectedElement.flipY ? -1 : 1);
      }

      if (selectedElement.type === "text") {
        node.width(selectedElement.width);
        node.height(selectedElement.height);
        node.fontSize(selectedElement.fontSize);
        node.fontFamily(selectedElement.fontFamily || "Arial");
        node.fontStyle(`${selectedElement.bold ? "bold" : ""} ${selectedElement.italic ? "italic" : ""}`);
        node.align(selectedElement.align || "left");
        node.letterSpacing(selectedElement.letterSpacing || 0);
        node.lineHeight(selectedElement.lineHeight || 1.2);
        node.fill(selectedElement.fill);
      }
    }, [selectedElement, ref]);

    return (
      <div ref={containerRef} className="flex-1 p-4 bg-gray-200 flex justify-center items-center">
        <Stage width={stageSize.width} height={stageSize.height} ref={ref}>
          <Layer>
            {elements.map((el) => {
              if (el.type === "rectangle") {
                return (
                  <Rect
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    fill={el.fill}
                    rotation={el.rotation || 0}
                    opacity={el.opacity || 1}
                    cornerRadius={el.borderRadius || 0}
                    scaleX={el.flipX ? -1 : 1}
                    scaleY={el.flipY ? -1 : 1}
                    draggable
                    onClick={() => setSelectedElementId(el.id)}
                    onDragEnd={(e) => handleDragTransform(el.id, e.target)}
                    onTransformEnd={(e) => handleDragTransform(el.id, e.target)}
                  />
                );
              }

              if (el.type === "text") {
                return (
                  <Text
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    fontSize={el.fontSize}
                    fill={el.fill}
                    fontFamily={el.fontFamily || "Arial"}
                    fontStyle={`${el.bold ? "bold" : ""} ${el.italic ? "italic" : ""}`}
                    align={el.align || "left"}
                    letterSpacing={el.letterSpacing || 0}
                    lineHeight={el.lineHeight || 1.2}
                    rotation={el.rotation || 0}
                    opacity={el.opacity || 1}
                    draggable
                    onClick={() => setSelectedElementId(el.id)}
                    onDragEnd={(e) => handleDragTransform(el.id, e.target)}
                    onTransformEnd={(e) => handleDragTransform(el.id, e.target)}
                  />
                );
              }

              if (el.type === "image") {
                return (
                  <CanvasImage
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    rotation={el.rotation || 0}
                    opacity={el.opacity || 1}
                    scaleX={el.flipX ? -1 : 1}
                    scaleY={el.flipY ? -1 : 1}
                    cornerRadius={el.borderRadius || 0}
                    src={el.src}
                    draggable
                    onClick={() => setSelectedElementId(el.id)}
                    onDragEnd={(e) => handleDragTransform(el.id, e.target)}
                    onTransformEnd={(e) => handleDragTransform(el.id, e.target)}
                  />
                );
              }

              return null;
            })}

            {transformerNode && (
              <Transformer
                nodes={[transformerNode]}
                rotateEnabled={true}
                keepRatio={false}
                enabledAnchors={[
                  "top-left",
                  "top-right",
                  "bottom-left",
                  "bottom-right",
                  "middle-left",
                  "middle-right",
                  "top-center",
                  "bottom-center",
                ]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);

export default CanvasEditor;
