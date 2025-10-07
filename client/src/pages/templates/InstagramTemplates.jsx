// src/pages/templates/InstagramTemplates.jsx
import React from "react";

export default function InstagramTemplates() {
  const imageCount = 15; // total images
  const images = Array.from({ length: imageCount }, (_, i) => `/templates/instagram/img${i + 1}.jpeg`);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 ml-13">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
        Instagram Templates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
          >
            <img
              src={src}
              alt={`Instagram Template ${index + 1}`}
              className="w-full h-56 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
