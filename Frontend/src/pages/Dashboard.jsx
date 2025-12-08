import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  UploadCloud,
  BrainCircuit,
  LogOut,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, duration: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

// SAFE color map for Tailwind (no dynamic classes)
const COLOR_MAP = {
  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-300",
    glow: "group-hover:shadow-purple-500/30",
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-300",
    glow: "group-hover:shadow-blue-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-300",
    glow: "group-hover:shadow-emerald-500/30",
  },
};

// Premium Action Card Component
const ActionCard = ({ title, desc, icon: Icon, onClick, color }) => {
  const C = COLOR_MAP[color];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden 
        border border-white/10 bg-white/[0.04] backdrop-blur-xl 
        p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)] 
        transition-all duration-300 ${C.glow}`}
    >
      {/* Soft glow background */}
      <div
        className={`absolute -top-12 -right-12 h-40 w-40 rounded-full 
          blur-[75px] opacity-0 group-hover:opacity-40 
          transition-all duration-700 ${C.bg}`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Icon */}
          <div
            className={`h-12 w-12 rounded-xl border border-white/10 
              ${C.bg} ${C.text} flex items-center justify-center 
              backdrop-blur-lg mb-4`}
          >
            <Icon size={24} />
          </div>

          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>

        {/* CTA */}
        <div
          className={`mt-6 flex items-center gap-2 text-sm font-semibold ${C.text} 
            group-hover:translate-x-2 transition-transform`}
        >
          Access Now <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#020617] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-15%] w-[30rem] h-[30rem] bg-purple-600/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[140px]" />
      </div>

      <Sidebar />

      <motion.main
        className="flex-1 p-8 md:p-12 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 
                rounded-full bg-purple-500/10 border border-purple-500/20 
                text-purple-200 text-xs font-semibold backdrop-blur-xl mb-3"
              >
                <Sparkles size={12} /> AI Student Portal
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r 
                from-white via-slate-300 to-slate-500 bg-clip-text text-transparent"
              >
                Welcome back, {user?.name || "Student"} 👋
              </h1>

              <p className="text-slate-400 mt-2 text-lg">
                Your AI tutor is online. What would you like to learn today?
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
              text-slate-400 hover:text-red-400 hover:bg-red-500/10 
              transition-all text-sm font-medium"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </motion.div>

        {/* ACTION CARDS */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <ActionCard
            title="Start AI Session"
            desc="Chat with your AI tutor, ask doubts, and learn actively."
            icon={MessageSquare}
            color="purple"
            onClick={() => navigate("/chat")}
          />

          <ActionCard
            title="Upload Syllabus"
            desc="Upload PDFs or Docs to train your AI tutor."
            icon={UploadCloud}
            color="blue"
            onClick={() => navigate("/syllabus-paste")}
          />

          <ActionCard
            title="Generate Study Plan"
            desc="Get a personalised, structured weekly study roadmap."
            icon={BrainCircuit}
            color="emerald"
            onClick={() => navigate("/study-plan")}
          />
        </motion.div>
      </motion.main>
    </div>
  );
}
