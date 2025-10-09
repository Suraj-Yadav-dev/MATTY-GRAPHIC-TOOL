import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDesigns, selectDesign } from "../redux/designSlice";

// Components
import Sidebar from "../components/Dashboard/Sidebar";
import DesignGrid from "../components/Dashboard/DesignGrid";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { designs, loading, error } = useSelector((state) => state.design);

  useEffect(() => {
    dispatch(fetchUserDesigns());
  }, [dispatch]);

  // Optional: handle click on a design
  const handleSelectDesign = (design) => {
    dispatch(selectDesign(design));
    // Navigate to editor page with selected design
    window.location.href = `/editor`; // Or use react-router navigate
  };

  return (
    <div className="flex h-screen bg-gray-100 ml-13">
      <Sidebar />

      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4"> Designs</h1>

        {loading && <p>Loading designs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !designs.length && <p>No designs found. Create your first one!</p>}

        <DesignGrid designs={designs} onSelect={handleSelectDesign} />
      </div>
    </div>
  );
}
