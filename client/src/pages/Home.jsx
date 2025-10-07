import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuiltInDesigns } from "../redux/designSlice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import designerAnimation from "../assets/Designer.json";
import LayoutTextFlip from "../components/ui/layout-text-flip";

// ✅ Use folder names exactly as they exist in /public/templates
const categories = [
  { key: "instagram", folder: "instagram", label: "Instagram", path: "/templates/instagram" },
  { key: "linkedin", folder: "linkedin", label: "LinkedIn", path: "/templates/linkedin" },
  { key: "certificate", folder: "certificates", label: "Certificate", path: "/templates/certificates" },
  { key: "business-card", folder: "Business-Cards", label: "Business Card", path: "/templates/Business-Cards" },
  { key: "resume", folder: "Resume", label: "Resume", path: "/templates/Resume" },
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { designs, loading, error } = useSelector((state) => state.design);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    dispatch(fetchBuiltInDesigns({ category: activeCategory, search }));
  }, [dispatch, activeCategory, search]);

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🌟 Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 mt-3 ml-14 mr-4 rounded-3xl overflow-hidden shadow-lg flex items-center">
        <img
          src="/neon.jpg"
          alt="Neon Banner"
          className="absolute w-full h-full object-cover object-center rounded-3xl"
        />
        <div className="relative z-10 flex-1 px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
            Matty - Editor Tool
          </h1>
        </div>
        <div className="relative z-10 w-1/3 h-full flex items-center justify-end pr-8">
          <Lottie animationData={designerAnimation} loop={true} />
        </div>
      </div>

      {/* 📝 Flip Text */}
      <div className="pl-10 pr-6 py-1">
        <div className="pt-8 text-center">
          <LayoutTextFlip
            words={["Welcome", "to", "Matty", "Editor", "Tool"]}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800"
          />
        </div>

        {/* 🧠 Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => handleCategoryClick(cat.path)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex flex-col items-center justify-center p-4"
            >
              <img
                src={`/templates/${cat.folder}/img1.jpeg`} // ⚡ Ensure extension matches actual file
                alt={cat.label}
                className="w-full h-32 object-cover rounded-xl mb-3"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-thumb.jpg"; // fallback
                }}
              />
              <span className="text-lg font-semibold text-gray-800 text-center capitalize">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
