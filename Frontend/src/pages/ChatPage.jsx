import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../Context/AuthContext";
import { Send, Loader2 } from "lucide-react";

const CHAT_API_URL = import.meta.env.VITE_API_URL + "/chat/ask";
const SYLLABUS_API_URL = import.meta.env.VITE_API_URL + "/syllabus/latest";

const LOAD_MSG = "Loading your personalised tutor… ⏳🔥";

const initialMessages = [
  {
    role: "assistant",
    content: LOAD_MSG,
  },
];

export default function ChatPage() {
  const { token } = useAuth();

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState(null);

  // PREVENTS DOUBLE FIRING
  const welcomeProcessed = useRef(false);

  const bottomRef = useRef(null);

  // --------------------------------------------------
  // 1. LOAD LATEST SYLLABUS
  // --------------------------------------------------
  useEffect(() => {
    axios
      .get(SYLLABUS_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSyllabus(res.data.syllabus || null);
      })
      .catch(() => setSyllabus(null));
  }, [token]);

  // --------------------------------------------------
  // 2. SEND AUTOMATIC WELCOME MESSAGE (FIXED)
  // --------------------------------------------------
  const autoWelcomeMessage = async () => {
    // Stop if already ran or no syllabus
    if (!syllabus || welcomeProcessed.current) return;

    welcomeProcessed.current = true; // LOCK IT IMMEDIATELY
    setLoading(true);

    try {
      const res = await axios.post(
        CHAT_API_URL,
        {
          question:
            "Give a short GenZ humorous welcome message based on my syllabus. Reply with only ONE message.",
          syllabusId: syllabus._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // FIX: REMOVE THE LOADING MESSAGE, THEN ADD NEW ONE
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== LOAD_MSG),
        { role: "assistant", content: res.data.answer },
      ]);
    } catch {
      // FIX: REMOVE LOADING MESSAGE ON ERROR TOO
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== LOAD_MSG),
        { role: "assistant", content: "Bro I'm here 😂📘 Ask me anything!" },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (syllabus) {
      autoWelcomeMessage();
    }
  }, [syllabus]);

  // --------------------------------------------------
  // 3. AUTO SCROLL
  // --------------------------------------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // --------------------------------------------------
  // 4. SEND USER MESSAGE
  // --------------------------------------------------
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        CHAT_API_URL,
        {
          question: input,
          syllabusId: syllabus?._id || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "💀 Bro my brain lagged. Try again?",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col px-4 md:px-10 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
            AI Tutor{" "}
            <span className="text-green-400 text-sm">• Online & Ready</span>
          </h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "assistant"
                    ? "bg-[#ffffff1A] text-blue-100 border border-white/10"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-blue-200">
              <Loader2 size={18} className="animate-spin" />
              AI is thinking…
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <div className="w-full flex justify-center mt-4">
          <div className="w-full max-w-3xl bg-[#ffffff0d] border border-white/10 flex items-center rounded-full px-4 py-3">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything from your syllabus..."
              className="flex-1 bg-transparent outline-none resize-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-blue-200 mt-2 opacity-50">
          AI can make mistakes. Check important info.
        </p>
      </main>
    </div>
  );
}
