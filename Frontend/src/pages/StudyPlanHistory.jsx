import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { Calendar, FileText } from "lucide-react";

export default function StudyPlanHistory() {
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/studyplan/my-plans`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlans(res.data.plans))
      .catch(() => {});
  }, [token]);

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          <Calendar className="inline mr-2" /> Past Study Plans
        </h1>

        <div className="space-y-4">
          {plans.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 border border-white/10 p-5 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">
                    <FileText className="inline mr-2 text-blue-400" />
                    {p.syllabusId?.originalName}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Days: {p.days} | Difficulty: {p.difficulty}
                  </p>
                </div>

                <a
                  href={`/study-plan/${p._id}`}
                  className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
                >
                  View
                </a>
              </div>
            </div>
          ))}

          {!plans.length && (
            <p className="text-slate-400 text-center mt-12">
              No study plans yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
