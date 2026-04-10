import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import { motion } from "framer-motion";
import { hoverCardMotion } from "../utils/motion";

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

export default function Roadmap() {
  const [stats, setStats] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [days, setDays] = useState(7);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((r) => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const generatePlan = async () => {
    if (!stats) return;
    setGenerating(true);
    setPlan(null);
    try {
      const { data } = await api.post("/analysis/roadmap", {
        topicStats: stats.topicStats,
        weakTopic: stats.weakTopic,
        days,
      });
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#080812] p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            AI Study Roadmap
          </h1>
          <p className="text-sm text-[#555]">
            Personalized plan based on your weak topics
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left — topic stats + generate */}
            <div className="flex flex-col gap-4 w-full xl:w-72 shrink-0">
              {/* Topic breakdown */}
              <motion.div
                {...hoverCardMotion}
                className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5"
              >
                <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-4">
                  Your topic stats
                </p>
                {stats?.topicStats?.length === 0 ? (
                  <p className="text-xs text-[#444] text-center py-4">
                    No data yet — analyze some problems first
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {stats?.topicStats?.map((t, i) => {
                      const pct = Math.round(t.avgScore);
                      const color = TOPIC_COLOR[t._id] || "#a78bfa";
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-[#ccc]">
                              {t._id}
                            </span>
                            <span
                              className="text-xs font-bold"
                              style={{ color }}
                            >
                              {pct}% · {t.count} solved
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%`, background: color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Generate controls */}
              <motion.div
                {...hoverCardMotion}
                className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5"
              >
                <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-4">
                  Generate plan
                </p>
                <p className="text-xs text-[#555] mb-3">How many days?</p>
                <div className="flex gap-2 mb-4">
                  {[3, 7, 14].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer
                        ${
                          days === d
                            ? "bg-[#1e1040] border-[#7c3aed] text-[#a78bfa]"
                            : "bg-transparent border-[#1e1e35] text-[#555] hover:border-[#2a2a45] hover:text-[#888]"
                        }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>

                {stats?.weakTopic && stats.weakTopic !== "N/A" && (
                  <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl bg-[#2d1f0a] border border-[#fb923c]/20">
                    <span className="text-[11px] text-[#fb923c] font-medium">
                      ⚠ Weak area: {stats.weakTopic}
                    </span>
                  </div>
                )}

                <button
                  onClick={generatePlan}
                  disabled={generating || stats?.topicStats?.length === 0}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  }}
                >
                  {generating ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    "⚡ Generate my roadmap"
                  )}
                </button>

                {stats?.topicStats?.length === 0 && (
                  <p className="text-[11px] text-[#444] text-center mt-2">
                    Analyze problems first to get a personalized plan
                  </p>
                )}
              </motion.div>
            </div>

            {/* Right — plan */}
            <div className="flex-1">
              {!plan && !generating && (
                <motion.div
                  {...hoverCardMotion}
                  className="flex flex-col items-center justify-center h-64 gap-3 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1a1a2e] flex items-center justify-center text-2xl">
                    🗺
                  </div>
                  <p className="text-sm font-semibold text-white">
                    No roadmap yet
                  </p>
                  <p className="text-xs text-[#444] text-center max-w-xs">
                    Click Generate to get a personalized study plan based on
                    your weak topics
                  </p>
                </motion.div>
              )}

              {generating && (
                <motion.div
                  {...hoverCardMotion}
                  className="flex flex-col items-center justify-center h-64 gap-4 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl"
                >
                  <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#555]">
                    AI is building your plan...
                  </p>
                </motion.div>
              )}

              {plan && (
                <div className="flex flex-col gap-4">
                  {plan.map((day, i) => (
                    <motion.div
                      {...hoverCardMotion}
                      key={i}
                      className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg,#7c3aed,#a78bfa)",
                            color: "#fff",
                          }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {day.day}
                          </p>
                          <p className="text-xs text-[#555]">{day.focus}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {day.tasks?.map((task, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#080812] border border-[#1a1a2e]"
                          >
                            <span className="text-[#7c3aed] mt-0.5 shrink-0 text-sm">
                              →
                            </span>
                            <p className="text-sm text-[#888] leading-relaxed">
                              {task}
                            </p>
                          </div>
                        ))}
                      </div>
                      {day.goal && (
                        <div className="mt-3 px-4 py-2.5 rounded-xl bg-[#1e1040] border border-[#7c3aed]/20">
                          <p className="text-xs text-[#a78bfa]">
                            🎯 Goal: {day.goal}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
