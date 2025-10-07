// src/utils/helpers.js

// Generate unique ID
export const generateId = (prefix = "el") => `${prefix}-${Date.now()}`;

// Format date nicely
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

// Convert canvas JSON to image (for download/export)
export const downloadCanvasAsImage = (stageRef, filename = "design.png") => {
  if (!stageRef.current) return;
  const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
  const link = document.createElement("a");
  link.download = filename;
  link.href = uri;
  link.click();
};
