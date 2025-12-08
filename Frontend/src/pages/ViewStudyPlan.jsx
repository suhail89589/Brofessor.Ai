import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function ViewStudyPlan() {
  const { id } = useParams();
  const { token } = useAuth();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/studyplan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlan(res.data.plan))
      .catch(() => {});
  }, [id, token]);

  if (!plan) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      <Sidebar />

      <div className="p-10 flex-1">
        <h1 className="text-2xl font-bold mb-4">Study Plan Details</h1>

        <pre className="whitespace-pre-wrap bg-white/5 p-5 rounded">
          {plan.planText}
        </pre>
      </div>
    </div>
  );
}
