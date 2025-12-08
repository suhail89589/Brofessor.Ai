import React from "react";
import Dashboard1 from "../assets/Dashboard1.png";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import {
  Clock,
  Mic,
  CheckCircle2,
  Zap,
  PieChart,
  Target,
  Sparkles,
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, duration: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function FeaturesPage() {
  const features = [
    {
      title: "Daily AI Class (Upcoming Soon)",
      desc: "Attend personalised classes that adapt to your speed and understanding.",
      icon: Clock,
    },
    {
      title: "Paste Syllabus → Instant Analysis",

      desc: "Paste your syllabus and instantly get cleaned text, extracted topics, and structured breakdown.",

      icon: Sparkles,
    },
    {
      title: "Voice + Chat Learning (Soon)",
      desc: "Speak naturally. The AI understands context, tone, slang, and corrections.",
      icon: Mic,
    },
    {
      title: "AI Doubt Solving Chat",

      desc: "Ask any question and get instant, clear explanations with examples.",

      icon: Mic,
    },
    {
      title: "Visual Learning (Upcoming Soon)",
      desc: "On-demand diagrams, flowcharts, and visuals for complex concepts.",
      icon: PieChart,
    },
    {
      title: "Syllabus Topic Extraction",

      desc: "Automatically identifies key concepts and prepares topic lists for focused revision.",

      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full py-24 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Soft Ambient Glow (Cleaner than grid) */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-purple-700/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-5 shadow-[0_0_20px_rgba(88,28,135,0.25)] backdrop-blur">
            <Sparkles size={14} />
            <span>Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Master Your Syllabus
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-28"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.25 },
              }}
              className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.4)] hover:bg-white/[0.07] transition-all cursor-default"
            >
              {/* Soft glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/20 blur-[55px] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-5 text-purple-300 group-hover:text-white transition-all">
                <f.icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* See It In Action */}
        <div className="relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            See It In Action
          </h2>

          <Tilt
            options={{
              max: 12,
              scale: 1.02,
              speed: 900,
              glare: true,
              "max-glare": 0.3,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="relative rounded-3xl p-3 bg-white/[0.03] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.65)] overflow-hidden backdrop-blur-2xl">
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/40 to-blue-600/40 blur-2xl opacity-20"></div>

              {/* Dashboard Image */}
              <img
                src={Dashboard1}
                alt="Dashboard"
                className="relative w-full rounded-2xl border border-white/10 object-cover"
              />

              {/* Light overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
