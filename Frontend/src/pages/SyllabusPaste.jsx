import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function SyllabusPaste() {
  const { token } = useAuth();
  const navigate = useNavigate();

const API = import.meta.env.VITE_API_URL;

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!token) {
      setError("You must login first.");
      return;
    }

    if (!text.trim()) {
      setError("Please paste some syllabus text.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/syllabus/paste`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/syllabus-result", {
        state: {
          text: res.data.text,
          topics: res.data.topics,
          fileName: "Pasted Syllabus",
        },
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#020617]">
      <Sidebar />

      <main className="flex-1 p-8 text-white max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Paste Your Syllabus</h1>

        {error && (
          <p className="text-red-400 bg-red-500/10 p-3 rounded mb-3">{error}</p>
        )}

        <textarea
          rows={15}
          className="w-full bg-black/30 p-4 rounded-lg border border-white/10 outline-none text-white placeholder:text-slate-400"
          placeholder="Paste your syllabus text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r 
                     from-purple-600 to-blue-600 hover:scale-[1.02] 
                     transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Analyze Syllabus"}
        </button>
      </main>
    </div>
  );
}
