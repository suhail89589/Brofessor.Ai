import React from "react";
import { ArrowRight, Zap, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AiVideo from "../assets/Ai2.mp4";

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rightVisualVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.15 },
  },
};

export default function Hero() {
  return (
    <section className="relative flex w-full min-h-screen items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-10">
      {/* Uses global background only */}

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14 lg:flex-row lg:items-center lg:justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT CONTENT (unchanged) */}
        <div className="flex flex-1 flex-col items-start">
          <motion.div
            variants={fadeInUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md shadow-[0_0_20px_rgba(15,23,42,0.6)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Beta access now live for students
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-5 text-balance text-[2.4rem] leading-tight tracking-tight sm:text-[3rem] md:text-[3.4rem] lg:text-[3.8rem] font-semibold"
          >
            Your <span className="text-slate-200">next-Gen study partner,</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              India&apos;s First GenZ Personal Tutor
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-7 max-w-xl text-pretty text-sm sm:text-base text-slate-300/85 leading-relaxed"
          >
            Upload your syllabus, pick your exam, and let your AI tutor handle
            the heavy lifting — from daily study plans and explanations to
            quizzes and revision. Study like a topper without acting like one.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-8 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <Sparkles size={14} />
              Hyper-personalised learning paths
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <Zap size={14} />
              Instant doubt-solving 24/7
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Optimised for Indian exams
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 
                           text-sm sm:text-base font-semibold text-slate-950 
                           shadow-[0_18px_45px_rgba(15,23,42,0.55)]"
              >
                <Zap size={18} className="fill-slate-950" />
                Start learning for free
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-medium text-slate-100 backdrop-blur-xl"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              See how it works <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400"
          >
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border border-slate-900/80 bg-gradient-to-tr from-purple-500 to-cyan-400" />
              <div className="h-7 w-7 rounded-full border border-slate-900/80 bg-gradient-to-tr from-pink-500 to-amber-400" />
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-900/80 bg-slate-800 text-[10px]">
                +1K
              </div>
            </div>
            <p>
              Helping{" "}
              <span className="text-slate-200 font-semibold">
                1,000+ students
              </span>{" "}
              stay consistent daily.
            </p>
          </motion.div>
        </div>

        {/* ⭐ Floating Circular AI Orb (updated right side) */}
        <motion.div
          variants={rightVisualVariants}
          className="relative mt-10 flex flex-1 justify-center lg:mt-0 lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-[260px] sm:w-[300px] md:w-[360px] flex items-center justify-center"
          >
            {/* Purple ambient glow */}
            <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-[90px]" />
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[50px]" />

            {/* Circle video container */}
            <div className="relative rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.35)] w-full aspect-square">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover rounded-full mix-blend-screen"
                style={{
                  maskImage:
                    "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                }}
              >
                <source src={AiVideo} type="video/mp4" />
              </video>
            </div>

            
          </motion.div>
        </motion.div>
      </motion.div>

      
    </section>
  );
}
