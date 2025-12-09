import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Sparkles, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE}/user/login`,
        formData
      );

      // ✅ FIXED TOKEN PATH
      login(res.data.user, res.data.user.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[26rem] h-[26rem] bg-purple-600/25 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[26rem] h-[26rem] bg-blue-500/20 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/[0.06] border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center mx-auto rounded-xl bg-purple-500/20 text-purple-300">
            <Sparkles size={26} />
          </div>

          <h2 className="text-3xl mt-4 font-bold">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">
            Continue your learning journey.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <Mail
              className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition"
              size={18}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-600 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock
              className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-600 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold 
                       hover:scale-[1.02] active:scale-[0.98] shadow-lg
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register */}
        <p className="mt-6 text-center text-slate-400 text-sm">
          New here?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
