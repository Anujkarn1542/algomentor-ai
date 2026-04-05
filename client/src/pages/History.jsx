import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const TOPIC_COLOR = {
  Arrays: "#a78bfa",
  Graph: "#34d399",
  DP: "#fb923c",
  Trees: "#60a5fa",
  Strings: "#f472b6",
  Sorting: "#facc15",
  Greedy: "#4ade80",
  Other: "#94a3b8",
};
const DIFF_COLOR = { Easy: "#4ade80", Medium: "#fb923c", Hard: "#f87171" };

function timeAgo(date) {
  const diff = Date.now() - new Date(date);
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function scoreColor(s) {
  if (s >= 70) return "#4ade80";
  if (s >= 40) return "#fb923c";
  return "#f87171";
}

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/analysis/history")
      .then((r) => setItems(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const topics = ["All", ...new Set(items.map((i) => i.topic))];
  const filtered =
    filter === "All" ? items : items.filter((i) => i.topic === filter);

  return (
    <Layout>
      <div className="min-h-screen bg-[#080812] p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Analysis History
          </h1>
          <p className="text-sm text-[#555]">All your past code analyses</p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer
                ${
                  filter === t
                    ? "bg-[#1e1040] border-[#7c3aed] text-[#a78bfa]"
                    : "bg-transparent border-[#1e1e35] text-[#555] hover:border-[#2a2a45] hover:text-[#888]"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <p className="text-[#555] text-sm">No analyses yet</p>
            <a
              href="/analyze"
              className="text-xs font-semibold px-4 py-2 rounded-xl text-white no-underline hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
            >
              Analyze your first problem →
            </a>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-6">
            {/* List */}
            <div className="flex flex-col gap-3 flex-1">
              {filtered.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left bg-[#0f0f20] border rounded-2xl p-5 transition-all cursor-pointer hover:border-[#2a2a45]
                    ${selected?._id === item._id ? "border-[#7c3aed]" : "border-[#1e1e35]"}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: `${TOPIC_COLOR[item.topic] || "#a78bfa"}20`,
                        color: TOPIC_COLOR[item.topic] || "#a78bfa",
                      }}
                    >
                      {item.topic?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">
                          {item.problemTitle}
                        </p>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${DIFF_COLOR[item.difficulty]}18`,
                            color: DIFF_COLOR[item.difficulty],
                          }}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-xs text-[#444]">
                          {item.topic}
                        </span>
                        <span className="text-xs text-[#444]">
                          {item.language}
                        </span>
                        <span className="text-xs text-[#333]">
                          {timeAgo(item.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-lg font-bold"
                        style={{ color: scoreColor(item.score) }}
                      >
                        {item.score}
                      </p>
                      <p className="text-[10px] text-[#444]">score</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#080812] text-[#555] font-mono border border-[#1e1e35]">
                      Time: {item.timeComplexity}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#080812] text-[#555] font-mono border border-[#1e1e35]">
                      Space: {item.spaceComplexity}
                    </span>
                    {item.pattern?.slice(0, 2).map((p, j) => (
                      <span
                        key={j}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1e1040] text-[#a78bfa] border border-[#2a2a45]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="w-full xl:w-80 shrink-0">
                <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5 sticky top-4">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <p className="text-sm font-semibold text-white leading-tight">
                      {selected.problemTitle}
                    </p>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-[#444] hover:text-white bg-transparent border-none cursor-pointer text-lg shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                      <p className="text-[10px] text-[#555] mb-1">Time</p>
                      <p className="text-sm font-bold text-[#a78bfa]">
                        {selected.timeComplexity}
                      </p>
                    </div>
                    <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                      <p className="text-[10px] text-[#555] mb-1">Space</p>
                      <p className="text-sm font-bold text-[#a78bfa]">
                        {selected.spaceComplexity}
                      </p>
                    </div>
                    <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                      <p className="text-[10px] text-[#555] mb-1">Score</p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: scoreColor(selected.score) }}
                      >
                        {selected.score}
                      </p>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#444] uppercase tracking-widest font-semibold mb-2">
                    Code
                  </p>
                  <pre className="bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-xs text-[#60a5fa] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48">
                    {selected.code}
                  </pre>

                  {selected.pattern?.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] text-[#444] uppercase tracking-widest font-semibold mb-2">
                        Patterns
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.pattern.map((p, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-[#1e1040] text-[#a78bfa]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
