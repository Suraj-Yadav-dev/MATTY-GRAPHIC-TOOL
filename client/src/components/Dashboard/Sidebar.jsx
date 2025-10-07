// src/components/Dashboard/Sidebar.jsx
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-4 border-r">
      <h2 className="font-bold text-lg mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-600 cursor-pointer">My Designs</li>
        <li className="hover:text-blue-600 cursor-pointer">Templates</li>
        <li className="hover:text-blue-600 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
}
