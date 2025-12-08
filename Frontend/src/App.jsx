import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feature from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import SyllabusUpload from "./pages/SyllabusPaste";
import SyllabusPaste from "./pages/SyllabusPaste";
import SyllabusResult from "./pages/SyllabusResult";

import StudyPlan from "./pages/StudyPlan";
import StudyPlanHistory from "./pages/StudyPlanHistory";
import ViewStudyPlan from "./pages/ViewStudyPlan";

import ProfilePage from "./pages/Profile";

import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="relative w-full min-h-screen text-white overflow-hidden bg-[#0a0a0a]">
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <div className="relative">
                {/* Background Effects */}
                <div className="fixed -top-40 -left-40 h-[28rem] w-[28rem] bg-purple-800/20 blur-[150px] pointer-events-none z-0"></div>
                <div className="fixed bottom-0 right-0 h-[32rem] w-[32rem] bg-indigo-700/20 blur-[170px] pointer-events-none z-0"></div>
                <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-noise"></div>

                {/* Landing Sections */}
                <Navbar />
                <Hero />
                <Feature />
                <HowItWorks />
                <CTA />
                <Footer />
              </div>
            }
          />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* FIXED: Paste syllabus page */}
          <Route
            path="/syllabus-paste"
            element={
              <ProtectedRoute>
                <SyllabusPaste />
              </ProtectedRoute>
            }
          />

          {/* Upload syllabus (optional future) */}
          <Route
            path="/syllabus-upload"
            element={
              <ProtectedRoute>
                <SyllabusUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/syllabus-result"
            element={
              <ProtectedRoute>
                <SyllabusResult />
              </ProtectedRoute>
            }
          />

          {/* Study Plan System */}
          <Route
            path="/study-plan"
            element={
              <ProtectedRoute>
                <StudyPlan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-plan-history"
            element={
              <ProtectedRoute>
                <StudyPlanHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-plan/:id"
            element={
              <ProtectedRoute>
                <ViewStudyPlan />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
