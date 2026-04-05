import { useState } from "react";
import Layout from "../components/Layout";
import Editor from "@monaco-editor/react";
import api from "../api/axios";

const TOPICS = [
  "Arrays",
  "Strings",
  "Graph",
  "DP",
  "Trees",
  "Sorting",
  "Greedy",
  "Binary Search",
  "Linked List",
  "Stack/Queue",
];
const LANGUAGES = ["javascript", "python", "cpp", "java"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const diffColor = { Easy: "#4ade80", Medium: "#fb923c", Hard: "#f87171" };
const scoreColor = (s) =>
  s >= 70 ? "#4ade80" : s >= 40 ? "#fb923c" : "#f87171";

export default function Analyze() {
  const [form, setForm] = useState({
    problemTitle: "",
    code: "// paste your solution here\n",
    language: "javascript",
    topic: "Arrays",
    difficulty: "Medium",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [showOptimized, setShowOptimized] = useState(false);

  const handleAnalyze = async () => {
    if (!form.problemTitle.trim())
      return setError("Please enter the problem title");
    if (!form.code.trim() || form.code.trim() === "// paste your solution here")
      return setError("Please paste your code");
    setLoading(true);
    setError("");
    setResult(null);
    setHintIndex(0);
    setShowOptimized(false);
    try {
      const { data } = await api.post("/analysis/analyze", form);
      setResult(data.aiResult);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen bg-[#080812] overflow-hidden">
        {/* LEFT — editor panel */}
        <div className="flex flex-col flex-1 border-r border-[#1e1e35]">
          {/* Top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e35] bg-[#0a0a18]">
            <input
              placeholder="Problem title e.g. Two Sum"
              value={form.problemTitle}
              onChange={(e) =>
                setForm({ ...form, problemTitle: e.target.value })
              }
              className="flex-1 px-3 py-2 rounded-lg bg-[#080812] border border-[#2a2a45] text-white placeholder-[#333] text-sm outline-none focus:border-[#7c3aed] transition-colors"
            />
            {["topic", "language", "difficulty"].map((key) => (
              <select
                key={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#080812] border border-[#2a2a45] text-[#ccc] text-sm outline-none focus:border-[#7c3aed] cursor-pointer"
              >
                {(key === "topic"
                  ? TOPICS
                  : key === "language"
                    ? LANGUAGES
                    : DIFFICULTIES
                ).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ))}
          </div>

          {/* Monaco editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={form.language === "cpp" ? "cpp" : form.language}
              value={form.code}
              onChange={(val) => setForm({ ...form, code: val || "" })}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                lineNumbers: "on",
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
              }}
            />
          </div>

          {/* Bottom bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-[#1e1e35] bg-[#0a0a18]">
            {error && <p className="text-xs text-red-400 flex-1">{error}</p>}
            {!error && (
              <p className="text-xs text-[#444] flex-1">
                Paste your solution and click Analyze
              </p>
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                "⚡ Analyze"
              )}
            </button>
          </div>
        </div>

        {/* RIGHT — results panel */}
        <div className="w-80 flex flex-col bg-[#0a0a18] overflow-y-auto">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#1a1a2e] flex items-center justify-center text-2xl">
                ⚡
              </div>
              <p className="text-sm font-semibold text-white">
                Ready to analyze
              </p>
              <p className="text-xs text-[#444]">
                Paste your code, fill the details and hit Analyze
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#555]">
                AI is analyzing your code...
              </p>
            </div>
          )}

          {result && (
            <div className="p-4 flex flex-col gap-4">
              {/* Score */}
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4 text-center">
                <p className="text-xs text-[#555] uppercase tracking-widest mb-2 font-semibold">
                  Code Score
                </p>
                <p
                  className="text-5xl font-bold mb-1"
                  style={{ color: scoreColor(result.score) }}
                >
                  {result.score}
                </p>
                <p className="text-xs text-[#555]">out of 100</p>
                {result.isOptimal && (
                  <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#0d2d1a] text-[#4ade80]">
                    Already optimal ✓
                  </span>
                )}
              </div>

              {/* Complexity */}
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                <p className="text-xs text-[#444] uppercase tracking-widest font-semibold mb-3">
                  Complexity
                </p>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                    <p className="text-[10px] text-[#555] mb-1">Time</p>
                    <p className="text-base font-bold text-[#a78bfa]">
                      {result.timeComplexity}
                    </p>
                  </div>
                  <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                    <p className="text-[10px] text-[#555] mb-1">Space</p>
                    <p className="text-base font-bold text-[#a78bfa]">
                      {result.spaceComplexity}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  {result.complexityExplanation}
                </p>
              </div>

              {/* Patterns */}
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                <p className="text-xs text-[#444] uppercase tracking-widest font-semibold mb-3">
                  Pattern detected
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.pattern?.map((p, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-[#1e1040] text-[#a78bfa]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hints */}
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#444] uppercase tracking-widest font-semibold">
                    Hint {hintIndex + 1} of {result.hints?.length}
                  </p>
                  {hintIndex < result.hints?.length - 1 && (
                    <button
                      onClick={() => setHintIndex((h) => h + 1)}
                      className="text-xs text-[#a78bfa] hover:text-[#c084fc] transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Next hint →
                    </button>
                  )}
                </div>
                <p className="text-sm text-[#888] leading-relaxed">
                  {result.hints?.[hintIndex]}
                </p>
              </div>

              {/* Improvements */}
              {result.improvements?.length > 0 && (
                <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                  <p className="text-xs text-[#444] uppercase tracking-widest font-semibold mb-3">
                    Improvements
                  </p>
                  <ul className="flex flex-col gap-2">
                    {result.improvements.map((imp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#888] leading-relaxed"
                      >
                        <span className="text-[#a78bfa] mt-0.5 shrink-0">
                          →
                        </span>{" "}
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optimized code */}
              {!result.isOptimal && (
                <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#444] uppercase tracking-widest font-semibold">
                      Optimized version
                    </p>
                    <button
                      onClick={() => setShowOptimized((s) => !s)}
                      className="text-xs text-[#a78bfa] hover:text-[#c084fc] bg-transparent border-none cursor-pointer"
                    >
                      {showOptimized ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showOptimized && (
                    <>
                      <div className="flex gap-2 mb-3">
                        <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-2 text-center">
                          <p className="text-[10px] text-[#555] mb-1">Time</p>
                          <p className="text-sm font-bold text-[#4ade80]">
                            {result.optimizedTimeComplexity}
                          </p>
                        </div>
                        <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-2 text-center">
                          <p className="text-[10px] text-[#555] mb-1">Space</p>
                          <p className="text-sm font-bold text-[#4ade80]">
                            {result.optimizedSpaceComplexity}
                          </p>
                        </div>
                      </div>
                      <pre className="text-xs text-[#60a5fa] bg-[#080812] rounded-xl p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                        {result.optimizedCode}
                      </pre>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
