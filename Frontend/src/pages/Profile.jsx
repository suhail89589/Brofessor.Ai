// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import {
  User as UserIcon,
  Mail,
  Shield,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, token, login } = useAuth();

  const API = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  useEffect(() => {
    const storedUser =
      user || JSON.parse(localStorage.getItem("user") || "null");

    if (storedUser) {
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    setSavingProfile(true);

    try {
      const res = await axios.put(
        `${API}/user/update`,
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedUser = res.data?.user || { ...(user || {}), name, email };

      login(updatedUser, token);
      setProfileMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    } catch (err) {
      setProfileMessage({
        type: "error",
        text:
          err.response?.data?.message || "Failed to update profile. Try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // 👉 Change password
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      return setPasswordMessage({
        type: "error",
        text: "New password should be at least 6 characters.",
      });
    }
    if (newPassword !== confirmPassword) {
      return setPasswordMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });
    }

    setSavingPassword(true);

    try {
      // Adjust URL if your backend route is different
      await axios.put(
        `${API}/user/update-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPasswordMessage({
        type: "success",
        text: "Password updated successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to update password. Try again.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-white relative overflow-hidden">
      {/* same background glows as dashboard / chat */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-[150px]" />
      </div>

      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-semibold backdrop-blur-xl mb-3">
              Profile
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your personal info and security for your AI Tutor account.
            </p>
          </div>

          {/* Layout: summary + edit sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Profile Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-semibold border border-white/20 shadow-lg shadow-purple-500/30">
                  {(name || user?.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {name || user?.name || "Student"}
                  </p>
                  <p className="text-slate-400 text-sm truncate max-w-[220px]">
                    {email || user?.email || "student@example.com"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Plan</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                    Free Plan
                  </span>
                </div>
                {/* You can wire these later once you have stats */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Study plans generated</span>
                  <span className="text-slate-200 font-medium text-xs">
                    —{/* placeholder */}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Syllabus uploads</span>
                  <span className="text-slate-200 font-medium text-xs">
                    —{/* placeholder */}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Edit Profile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <form onSubmit={handleProfileSave} className="space-y-4">
                <h2 className="text-base font-semibold mb-1 flex items-center gap-2">
                  <UserIcon size={18} /> Personal Info
                </h2>

                {profileMessage && (
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
                      profileMessage.type === "success"
                        ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/40"
                        : "bg-red-500/10 text-red-200 border-red-500/40"
                    }`}
                  >
                    {profileMessage.type === "success" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    <span>{profileMessage.text}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/60"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                {/* Email (editable or readonly as you prefer) */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/60"
                      placeholder="you@example.com"
                      required
                    />
                    <Mail
                      className="absolute right-3 top-2.5 text-slate-500"
                      size={16}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-semibold shadow-lg shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* CHANGE PASSWORD CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-w-5xl mx-auto"
          >
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <h2 className="text-base font-semibold mb-1 flex items-center gap-2">
                <Shield size={18} /> Security
              </h2>

              {passwordMessage && (
                <div
                  className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
                    passwordMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/40"
                      : "bg-red-500/10 text-red-200 border-red-500/40"
                  }`}
                >
                  {passwordMessage.type === "success" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>{passwordMessage.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 text-sm font-semibold text-slate-100 hover:bg-white/15 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition"
              >
                {savingPassword ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Update password"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
