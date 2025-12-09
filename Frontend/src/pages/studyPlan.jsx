import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Sidebar from "../components/Sidebar";
import { Loader2, Check, Copy, FileText } from "lucide-react";

export default function StudyPlan() {
  const { token } = useAuth();

  const API = import.meta.env.VITE_API_URL;
  
  const [selectedId, setSelectedId] = useState("");
  const [syllabusName, setSyllabusName] = useState(""); // NEW: Show name
  const [days, setDays] = useState(7);
  const [difficulty, setDifficulty] = useState("medium");

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // -------------------------------------------------
  // FETCH LATEST SYLLABUS ONLY
  // -------------------------------------------------
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get(
          `${API}/syllabus/latest`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const latest = res.data.syllabus;

        setSelectedId(latest._id);
        setSyllabusName(latest.originalName || "Latest Syllabus");
      } catch (err) {
        console.log("No syllabus found");
      }
    };

    fetchLatest();
  }, [token]);

  // -------------------------------------------------
  // GENERATE STUDY PLAN
  // -------------------------------------------------
  const generatePlan = async () => {
    if (!selectedId) {
      alert("Please paste/upload a syllabus first!");
      return;
    }

    setLoading(true);
    setPlan("");

    try {
      const res = await axios.post(
        `${API}/studyplan/generate`,
        {
          days,
          difficulty,
          syllabusId: selectedId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPlan(res.data.studyPlan);
    } catch (err) {
      setPlan("⚠️ Unable to generate study plan. Try again.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Study Plan Generator</h1>

        {/* Syllabus Status Box */}
        <div className="p-4 mb-6 bg-white/5 border border-white/10 rounded-lg">
          {selectedId ? (
            <p className="text-green-400">
              ✓ Using your latest syllabus:
              <span className="text-white font-semibold"> {syllabusName}</span>
            </p>
          ) : (
            <p className="text-red-400">
              ⚠ No syllabus found. Please paste/upload your syllabus first.
            </p>
          )}
        </div>

        {/* DAYS INPUT */}
        <label className="text-sm text-slate-300">Study Duration (Days)</label>
        <input
          type="number"
          className="w-full p-3 mt-1 mb-4 rounded bg-black/30 border border-white/10"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        {/* DIFFICULTY */}
        <label className="text-sm text-slate-300">Difficulty</label>
        <select
          className="w-full p-3 mt-1 mb-6 rounded bg-black/30 border border-white/10"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* GENERATE BUTTON */}
        <button
          onClick={generatePlan}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Generating…
            </div>
          ) : (
            "Generate Study Plan"
          )}
        </button>

        {/* OUTPUT */}
        {plan && (
          <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm flex items-center gap-2">
                <FileText size={18} /> study_plan.txt
              </p>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-sm text-slate-300">
              {plan}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
