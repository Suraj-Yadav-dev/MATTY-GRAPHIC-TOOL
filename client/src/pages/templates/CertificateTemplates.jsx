import React from "react";
import { useNavigate } from "react-router-dom";

export default function CertificateTemplates() {
  const navigate = useNavigate();
  const imageCount = 12;
  const images = Array.from({ length: imageCount }, (_, i) => `/templates/certificates/img${i + 1}.jpeg`);

  const handleClick = (src) => {
    // Navigate to editor page with template src as state
    navigate("/editor", { state: { templateSrc: src } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 ml-13">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
        Certificate Templates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => handleClick(src)}
          >
            <img
              src={src}
              alt={`Certificate Template ${index + 1}`}
              className="w-full h-56 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
