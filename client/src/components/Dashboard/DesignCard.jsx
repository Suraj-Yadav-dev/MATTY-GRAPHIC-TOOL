export default function DesignCard({ design, onSelect }) {
  if (!design) return null;
  const { thumbnailUrl, title } = design;

  return (
    <div
      className="cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105"
      onClick={() => onSelect(design)}
    >
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title || "Design"}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "/placeholder-thumb.jpg")}
          />
        ) : (
          <span className="text-gray-400">No Preview</span>
        )}
      </div>

      <div className="p-4 font-medium text-center text-gray-700">
        {title || "Untitled"}
      </div>
    </div>
  );
}
