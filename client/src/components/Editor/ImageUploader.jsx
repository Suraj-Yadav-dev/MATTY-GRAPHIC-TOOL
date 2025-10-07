// src/components/Editor/ImageUploader.jsx
export default function ImageUploader({ onAddImage }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      onAddImage({
        id: `image-${Date.now()}`,
        type: "image",
        src: ev.target.result,
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        rotation: 0,
        opacity: 1,
        borderRadius: 0,
        flipX: false,
        flipY: false,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="border px-2 py-1 rounded text-sm"
    />
  );
}
