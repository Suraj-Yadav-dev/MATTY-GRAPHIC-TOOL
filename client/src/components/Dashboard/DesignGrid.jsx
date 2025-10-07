import DesignCard from "./DesignCard";

export default function DesignGrid({ designs = [], onSelect }) {
  if (!designs || designs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No designs found. Try creating a new design.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {designs.map((design) => (
        <DesignCard key={design._id} design={design} onSelect={onSelect} />
      ))}
    </div>
  );
}
