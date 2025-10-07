import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 📄 Core Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/Editor";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🧭 Navbar (always visible)
import Navbar from "./components/Dashboard/Navbar";

// 🖼️ Template Category Pages
import InstagramTemplates from "./pages/templates/InstagramTemplates";
import LinkedInTemplates from "./pages/templates/LinkedinTemplates";
import CertificateTemplates from "./pages/templates/CertificateTemplates";
import BusinessCardTemplates from "./pages/templates/BusinessCardTemplates";
import ResumeTemplates from "./pages/templates/ResumeTemplates";

function App() {
  return (
    <Router>
      {/* 🌐 Navbar on all pages */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🧩 Template Category Pages */}
        <Route path="/templates/instagram" element={<InstagramTemplates />} />
        <Route path="/templates/linkedin" element={<LinkedInTemplates />} />
        <Route path="/templates/certificates" element={<CertificateTemplates />} />
        <Route path="/templates/business-cards" element={<BusinessCardTemplates />} />
        <Route path="/templates/resume" element={<ResumeTemplates />} />

        {/* Catch-all (404) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
