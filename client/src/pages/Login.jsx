// src/components/Auth/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Lottie from "react-lottie";
import animationData from "../assets/Designer.json";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="shadow-lg rounded-lg flex w-4/5 max-w-4xl overflow-hidden"
        style={{
          backgroundImage: `url('/neon.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: Lottie Animation */}
        <div className="w-1/2 bg-white/30 flex items-center justify-center backdrop-blur-md">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>

        {/* Right: Form */}
        <div className="w-1/2 p-8 bg-white/80 backdrop-blur-sm">
          <h2 className="text-3xl font-semibold text-center mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white transition ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-gray-600 hover:indigo-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-500 text-sm mt-2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
