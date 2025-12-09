import React from "react";
import Dashboard1 from "../assets/Dashboard1.png";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, Mic, CheckCircle2, PieChart, Sparkles } from "lucide-react";

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

// 🔥 Custom 3D Tilt Wrapper
function Tilt3D({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const rotateY = useTransform(x, [-1, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width;
    const dy = (e.clientY - rect.top) / rect.height;

    x.set(dx * 2 - 1);
    y.set(dy * 2 - 1);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        perspective: 1200,
      }}
      className="transition-transform duration-300"
    >
      {children}
    </motion.div>
  );
}

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
      desc: "Ask any question and get instant explanations with examples.",
      icon: Mic,
    },
    {
      title: "Visual Learning (Soon)",
      desc: "On-demand diagrams and visuals for complex concepts.",
      icon: PieChart,
    },
    {
      title: "Syllabus Topic Extraction",
      desc: "Automatically identifies key concepts for focused revision.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-purple-700/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-blue-600/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-5 backdrop-blur shadow">
            <Sparkles size={14} />
            <span>Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Master Your Syllabus
            </span>
          </h2>
        </div>

        {/* Feature Cards */}
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
              className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-purple-300 mb-5">
                <f.icon size={22} />
              </div>

              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* SEE IT IN ACTION — Replaced Tilt Component */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            See It In Action
          </h2>

          <Tilt3D>
            <div className="relative max-w-5xl mx-auto p-3 rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-2xl">
              {/* Dashboard Image */}
              <img
                src={Dashboard1}
                alt="Dashboard"
                className="w-full rounded-2xl border border-white/10 object-cover"
              />

              {/* Light Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}
