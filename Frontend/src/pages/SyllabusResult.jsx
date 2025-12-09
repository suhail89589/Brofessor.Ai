import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  BrainCircuit,
  MessageSquare,
  List,
  Sparkles,
} from "lucide-react";

export default function SyllabusResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { text, topics, fileName } = location.state || {};

  if (!location.state) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-lg">
        No data found. Please upload a syllabus first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#020617] text-white relative overflow-hidden">
      {/* Background glows (global theme) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[28rem] h-[28rem] bg-purple-600/25 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-[150px]" />
      </div>

      <Sidebar />

      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <CheckCircle size={42} className="text-emerald-400 mx-auto mb-4" />

            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Syllabus Analysis Complete
            </h1>

            <p className="text-slate-400 mt-2">
              We extracted all topics and structured your syllabus for AI
              learning.
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-8">
              {/* Topics Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <List size={20} className="text-purple-300" />
                  <h3 className="text-xl font-semibold">Detected Topics</h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-3">
                  {topics?.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-sm 
                                 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                                 text-purple-200 border border-white/10 backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Raw Text / Syllabus Viewer */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl"
              >
                {/* Header */}
                <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-2">
                  <FileText size={18} className="text-blue-300" />
                  <span className="text-sm text-slate-300 font-mono">
                    {fileName || "syllabus.txt"}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed">
                    {text}
                  </pre>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Generate Study Plan */}
              <button
                onClick={() => navigate("/study-plan")}
                className="w-full rounded-xl px-6 py-4 font-semibold text-white
                           bg-gradient-to-r from-purple-600 to-blue-600
                           hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg"
              >
                Generate Study Plan
              </button>

              {/* Ask AI Tutor */}
              <button
                onClick={() => navigate("/chat")}
                className="w-full rounded-xl px-6 py-4 font-semibold text-white
                           bg-white/10 border border-white/10 backdrop-blur-xl
                           hover:bg-white/20 hover:border-white/20 hover:scale-[1.02] transition-all"
              >
                Ask AI Tutor
              </button>

              {/* Return / Upload Again */}
              <button
                onClick={() => navigate("/syllabus-paste")}
                className="w-full rounded-xl px-6 py-4 font-semibold text-slate-200
                           bg-slate-800/40 border border-white/10 hover:bg-slate-700/40
                           hover:scale-[1.02] transition-all"
              >
                Upload Another File
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
