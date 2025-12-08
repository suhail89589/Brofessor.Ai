import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-wide group-hover:text-purple-300 transition-colors duration-300 hidden sm:block">
            Brofessor.Ai
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 hover:w-full group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="group relative px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl md:hidden"
          >
            {["Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-purple-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/login"
                className="w-full text-center py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/25"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
