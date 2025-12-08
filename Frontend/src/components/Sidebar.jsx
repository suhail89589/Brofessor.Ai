import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  UploadCloud,
  BookOpen,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronLeft,
    User as UserIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "AI Chat", path: "/chat", icon: MessageSquare },
  { label: "Paste Syllabus", path: "/syllabus-paste", icon: UploadCloud },
  { label: "Study Plan", path: "/study-plan", icon: BookOpen },
   { label: "Profile", path: "/profile", icon: UserIcon }
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white shadow-xl"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 85 : 250 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="hidden md:flex flex-col min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] relative z-40"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-6 p-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg text-white hidden md:flex"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Branding */}
        <div className="flex items-center gap-3 p-5">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30">
            <Sparkles className="text-white" size={20} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">Brofessor.AI</h1>
              <p className="text-xs text-purple-300">Genz Tutor System</p>
            </div>
          )}
        </div>

        {/* MENU */}
        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-300 relative overflow-hidden group
                ${
                  isActive(item.path)
                    ? "bg-white/10 border border-white/10 shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {isActive(item.path) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-lg" />
              )}

              {/* Icon */}
              <item.icon
                size={20}
                className={`${
                  isActive(item.path)
                    ? "text-purple-400"
                    : "group-hover:text-purple-300"
                }`}
              />

              {/* Label */}
              {!collapsed && (
                <span
                  className={`font-medium ${
                    isActive(item.path) ? "text-white" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* USER SECTION */}
        <div className="p-4 border-t border-white/5">
          <div
            className={`flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-white">
                  {user?.name || "Student"}
                </p>
                <p className="text-xs text-slate-500">Free Plan</p>
              </div>
            )}
          </div>

          {/* Sign Out */}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mt-3 w-full py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center gap-2 transition-all"
          >
            <LogOut size={18} /> {!collapsed && "Sign Out"}
          </button>
        </div>
      </motion.aside>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="fixed top-0 left-0 w-72 mini-h-screen bg-slate-950 border-r border-white/10 shadow-2xl z-50 p-4"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-slate-400"
              >
                <X size={24} />
              </button>

              {/* MOBILE CONTENT */}
              <div className="mt-10">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5"
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full mt-4 py-2 bg-red-500/10 text-red-300 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
