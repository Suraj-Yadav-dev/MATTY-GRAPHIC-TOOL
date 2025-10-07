// Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { FaHome, FaTachometerAlt, FaEdit, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const user = authState.user || JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-4 mt-1 py-3 flex justify-between items-center bg-transparent">
      {/* ☰ Menu Button */}
      <button
        className="text-2xl text-black hover:text-blue-600 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div></div>

      {/* Floating Icon Menu */}
      {menuOpen && (
        <div className="absolute top-full left-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-2 flex flex-col space-y-4 mt-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 text-xl flex justify-center" title="Home">
            <FaHome />
          </Link>

          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 text-xl flex justify-center" title="Dashboard">
            <FaTachometerAlt />
          </Link>

          <Link to="/editor" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 text-xl flex justify-center" title="Editor">
            <FaEdit />
          </Link>

          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-600 hover:text-red-800 text-xl flex justify-center" title="Logout">
              <FaSignInAlt />
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-blue-600 hover:text-blue-800 text-xl flex justify-center" title="Login">
                <FaSignInAlt />
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-green-600 hover:text-green-800 text-xl flex justify-center" title="Register">
                <FaUserPlus />
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
