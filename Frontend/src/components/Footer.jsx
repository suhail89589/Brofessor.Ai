import React from "react";
import {
  Instagram,
  Github,
  Linkedin,
  Twitter,
  Send,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, url: "https://www.instagram.com/iam_suhail89589/" },
    { icon: Github, url: "https://github.com/suhail89589" },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/mohd-suhail-7b5896366/",
    },
    { icon: Twitter, url: "https://x.com/MohdSuhail89589" },
  ];

  return (
    <footer className="relative w-full pt-20 pb-10 text-slate-300 border-t border-white/10">
      {/* ❗ No internal background grids or glow — unified with the landing page */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Brofessor<span className="text-purple-400">.ai</span>
            </h2>

            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              The future of learning — personalised, adaptive, and built around
              how *you* study best.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 
                             flex items-center justify-center backdrop-blur-xl
                             hover:bg-white/10 hover:border-white/20 hover:text-white
                             transition-all duration-300"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {["Features", "Pricing", "Testimonials", "Integration"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {["Documentation", "API Reference", "Community", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-6">Stay Updated</h3>

            <div className="relative group">
              {/* Soft gradient glow */}
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative flex items-center bg-black/30 border border-white/10 rounded-lg backdrop-blur-xl p-1">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-transparent text-sm text-white px-3 py-2 outline-none placeholder:text-slate-500"
                />
                <button
                  className="p-2 rounded-md bg-white/10 border border-white/10 
                             hover:bg-purple-600 hover:border-purple-500 text-white 
                             transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Brofessor.ai — All rights reserved.</p>

          <div className="flex items-center gap-1">
            Built with{" "}
            <Heart size={12} className="text-purple-500 fill-purple-500" /> by{" "}
            <span className="text-slate-300 font-medium">Suhail</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
