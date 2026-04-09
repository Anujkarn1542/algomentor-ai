import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

export default function Interview() {
  const [topic] = useState("Arrays");
  const [difficulty] = useState("Medium");
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);

    try {
      const { data } = await api.post("/interview/start", {
        topic,
        difficulty,
      });

      setMessages([
        {
          sender: "ai",
          text: data.question,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || loading) return;

    const currentAnswer = answer;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentAnswer,
      },
    ]);

    setAnswer("");
    setLoading(true);

    try {
      const { data } = await api.post("/interview/continue", {
        previousQuestion: messages[messages.length - 1]?.text || "",
        userAnswer: currentAnswer,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enter to send | Shift+Enter for newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitAnswer();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#080812] p-4 md:p-8">
        {/* Header aligned like dashboard */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            AI Interview Simulator
          </h1>
          <p className="text-sm text-[#555]">
            Practice real DSA mock interviews
          </p>
        </div>
        {/* Start button */}
        {messages.length === 0 && (
          <button
            onClick={startInterview}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-[#7c3aed] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        )}
        {/* Chat box full width */}
        <div className="mt-6 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4 h-[65vh] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#7c3aed] text-white"
                      : "bg-[#1a1a2e] text-[#ddd]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-[#888] text-sm">AI is thinking...</div>
            )}
          </div>
        </div>
        {/* Input box */}
        {messages.length > 0 && (
          <div className="mt-4 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-3">
            <div className="flex items-end gap-3">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer... (Enter to send)"
                className="flex-1 bg-transparent text-white resize-none outline-none px-2 py-2 leading-relaxed"
                rows={2}
              />

              <button
                onClick={submitAnswer}
                disabled={loading}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                }}
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
