import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TOPIC_COLORS = {
  Arrays: "#a78bfa",
  Graph: "#34d399",
  DP: "#fb923c",
  Trees: "#60a5fa",
  Strings: "#f472b6",
  Sorting: "#facc15",
  Greedy: "#4ade80",
  Other: "#94a3b8",
};

const diffColor = { Easy: "#4ade80", Medium: "#fb923c", Hard: "#f87171" };

function timeAgo(date) {
  const diff = Date.now() - new Date(date);
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((r) => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const firstName = user?.name?.split(" ")[0] || "there";

  const chartData =
    stats?.topicStats?.map((t) => ({
      name: t._id,
      solved: t.count,
      score: Math.round(t.avgScore),
    })) || [];

  return (
    <Layout>
      <div className="p-8 min-h-screen bg-[#080812]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-sm text-[#555]">
            Here's your DSA progress at a glance
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5">
                <p className="text-xs text-[#555] font-semibold uppercase tracking-widest mb-3">
                  Problems Analyzed
                </p>
                <p className="text-4xl font-bold text-white mb-3">
                  {stats?.total ?? 0}
                </p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0d2d1a] text-[#4ade80]">
                  All time
                </span>
              </div>

              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5">
                <p className="text-xs text-[#555] font-semibold uppercase tracking-widest mb-3">
                  Avg Score
                </p>
                <p className="text-4xl font-bold text-white mb-3">
                  {stats?.avgScore ?? 0}%
                </p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1e1040] text-[#a78bfa]">
                  Across all topics
                </span>
              </div>

              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5">
                <p className="text-xs text-[#555] font-semibold uppercase tracking-widest mb-3">
                  Weak Topic
                </p>
                <p className="text-xl font-bold text-white mb-3 mt-2">
                  {stats?.weakTopic ?? "—"}
                </p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2d1f0a] text-[#fb923c]">
                  Focus area
                </span>
              </div>
            </div>

            {/* Progress heatmap */}
            <div className="mb-8 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Consistency Heatmap
                  </p>
                  <p className="text-xs text-[#555] mt-1">
                    Your learning activity over time
                  </p>
                </div>

                <p className="text-xs text-[#a78bfa]">🔥 Stay consistent</p>
              </div>

              {stats?.heatmap?.length === 0 ? (
                <p className="text-[#555] text-sm text-center py-6">
                  No activity yet — start analyzing problems 🚀
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-15 gap-1.5">
                    {stats?.heatmap?.map((day, index) => {
                      let bg = "#1a1a2e";

                      if (day.count >= 4) bg = "#4ade80";
                      else if (day.count === 3) bg = "#34d399";
                      else if (day.count === 2) bg = "#a78bfa";
                      else if (day.count === 1) bg = "#7c3aed";

                      return (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-sm transition-transform hover:scale-110"
                          style={{ background: bg }}
                          title={`${day._id} • ${day.count} solved`}
                        />
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-2 mt-5 text-[10px] text-[#555]">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-sm bg-[#1a1a2e]" />
                    <div className="w-3 h-3 rounded-sm bg-[#7c3aed]" />
                    <div className="w-3 h-3 rounded-sm bg-[#a78bfa]" />
                    <div className="w-3 h-3 rounded-sm bg-[#34d399]" />
                    <div className="w-3 h-3 rounded-sm bg-[#4ade80]" />
                    <span>More</span>
                  </div>
                </>
              )}
            </div>

            {/* Chart + Recent */}
            <div className="grid grid-cols-5 gap-6">
              {/* Bar chart */}
              <div className="col-span-3 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6">
                <p className="text-sm font-semibold text-white mb-1">
                  Problems by topic
                </p>
                <p className="text-xs text-[#555] mb-6">
                  How many you've solved per area
                </p>

                {chartData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <p className="text-[#555] text-sm">No analyses yet</p>
                    <a
                      href="/analyze"
                      className="text-xs font-semibold px-4 py-2 rounded-xl bg-linear-to-r from-[#7c3aed] to-[#a78bfa] text-white no-underline"
                    >
                      Analyze your first problem →
                    </a>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} barSize={28}>
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#555", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#555", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#0f0f20",
                          border: "1px solid #1e1e35",
                          borderRadius: 10,
                          color: "#e2e2f0",
                        }}
                        cursor={{ fill: "rgba(167,139,250,0.05)" }}
                      />
                      <Bar dataKey="solved" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={TOPIC_COLORS[entry.name] || "#a78bfa"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Recent analyses */}
              <div className="col-span-2 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6">
                <p className="text-sm font-semibold text-white mb-1">
                  Recent analyses
                </p>
                <p className="text-xs text-[#555] mb-5">
                  Your last 5 submissions
                </p>

                {stats?.recent?.length === 0 ? (
                  <p className="text-[#555] text-sm text-center mt-12">
                    Nothing yet
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {stats?.recent?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            background: `${TOPIC_COLORS[item.topic] || "#a78bfa"}20`,
                            color: TOPIC_COLORS[item.topic] || "#a78bfa",
                          }}
                        >
                          {item.topic?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#ccc] font-medium truncate">
                            {item.problemTitle}
                          </p>
                          <p className="text-xs text-[#444]">
                            {timeAgo(item.createdAt)}
                          </p>
                        </div>
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
                          style={{
                            background: `${diffColor[item.difficulty] || "#a78bfa"}15`,
                            color: diffColor[item.difficulty] || "#a78bfa",
                          }}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                {
                  label: "Analyze new problem",
                  desc: "Paste code and get AI feedback",
                  href: "/analyze",
                  color: "#7c3aed",
                },
                {
                  label: "Watch a visualizer",
                  desc: "See algorithms step by step",
                  href: "/visualizer",
                  color: "#0f6e56",
                },
                {
                  label: "View my roadmap",
                  desc: "AI-generated study plan",
                  href: "/roadmap",
                  color: "#854F0B",
                },
              ].map(({ label, desc, href, color }) => (
                <a
                  key={href}
                  href={href}
                  className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5 no-underline hover:border-[#2a2a45] transition-colors group block"
                >
                  <div
                    className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                    style={{ background: `${color}25` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-[#555]">{desc}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
