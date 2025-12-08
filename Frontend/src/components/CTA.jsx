import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden
                   border border-white/10 bg-white/[0.03] backdrop-blur-2xl
                   shadow-[0_35px_120px_rgba(0,0,0,0.6)] p-10 md:p-20 text-center"
      >
     

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 
                          rounded-full bg-white/5 border border-white/10 
                          text-purple-200 text-sm font-medium mb-6 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-yellow-400" />
            <span>Join the Beta for Free</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            Ready to upgrade your learning?
          </h2>

          {/* Subtext */}
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop studying harder. Start studying smarter with your own
            AI-powered tutor — built to improve the way students learn forever.
          </p>

          {/* CTA Button */}
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full bg-white text-black font-semibold 
                         text-lg shadow-[0_0_35px_rgba(255,255,255,0.25)]
                         flex items-center gap-2 mx-auto transition-transform"
            >
              Get Started Now <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
