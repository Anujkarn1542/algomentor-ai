import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

// ── Bubble Sort Steps ──────────────────────────────────────────────────
function getBubbleSteps(input) {
  const a = [...input];
  const steps = [];
  const n = a.length;
  const sorted = new Set();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        sorted: new Set(sorted),
        swapped: false,
        msg: `Comparing ${a[j]} and ${a[j + 1]}`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          sorted: new Set(sorted),
          swapped: true,
          msg: `Swapped → ${a[j]} and ${a[j + 1]}`,
        });
      }
    }
    sorted.add(n - 1 - i);
  }
  sorted.add(0);
  steps.push({
    array: [...a],
    comparing: [],
    sorted: new Set(sorted),
    swapped: false,
    msg: "✓ Array sorted!",
  });
  return steps;
}

// ── Binary Search Steps ────────────────────────────────────────────────
function getBinarySteps(input, target) {
  const a = [...input].sort((x, y) => x - y);
  const steps = [];
  let lo = 0,
    hi = a.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: a,
      lo,
      hi,
      mid,
      found: false,
      notFound: false,
      msg: `lo=${lo} hi=${hi} → checking mid[${mid}]=${a[mid]}`,
    });
    if (a[mid] === target) {
      steps.push({
        array: a,
        lo,
        hi,
        mid,
        found: true,
        notFound: false,
        msg: `✓ Found ${target} at index ${mid}!`,
      });
      return steps;
    }
    if (a[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  steps.push({
    array: a,
    lo: -1,
    hi: -1,
    mid: -1,
    found: false,
    notFound: true,
    msg: `✗ ${target} not found in array`,
  });
  return steps;
}

// ── BFS Steps ─────────────────────────────────────────────────────────
function getBfsSteps() {
  const graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1, 5],
    5: [2, 4],
  };
  const steps = [];
  const visited = new Set([0]);
  const queue = [0];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    steps.push({
      visited: new Set(visited),
      current: node,
      queue: [...queue],
      order: [...order],
      msg: `Visiting node ${node} — Queue: [${queue.join(", ")}]`,
    });
    for (const nb of graph[node]) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }
  steps.push({
    visited: new Set(visited),
    current: -1,
    queue: [],
    order: [...order],
    msg: "✓ BFS complete!",
  });
  return steps;
}

// ── Linked List Steps ──────────────────────────────────────────────────
function getLinkedSteps(list) {
  const steps = [];
  for (let i = 0; i < list.length; i++) {
    steps.push({ current: i, msg: `Visiting node[${i}] = ${list[i]}` });
  }
  steps.push({ current: -1, msg: "✓ Reached NULL — traversal complete!" });
  return steps;
}

// ── BUBBLE SORT VIZ ────────────────────────────────────────────────────
function BubbleViz({ step }) {
  if (!step) return null;
  const { array, comparing, sorted, swapped } = step;
  const max = Math.max(...array);
  return (
    <div
      className="flex items-end justify-center gap-2 px-6"
      style={{ height: 200 }}
    >
      {array.map((val, i) => {
        let bg = "#1e1e35";
        if (sorted && sorted.has(i)) bg = "#4ade80";
        else if (comparing.includes(i)) bg = swapped ? "#f87171" : "#a78bfa";
        const h = Math.max(20, Math.round((val / max) * 160));
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] text-[#555]">{val}</span>
            <div
              className="w-full rounded-t-lg"
              style={{
                height: h,
                background: bg,
                transition: "height 0.2s, background 0.2s",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ── BINARY SEARCH VIZ ─────────────────────────────────────────────────
function BinaryViz({ step }) {
  if (!step) return null;
  const { array, lo, hi, mid, found, notFound } = step;
  return (
    <div className="flex items-end justify-center gap-3 flex-wrap px-6 py-4">
      {array.map((val, i) => {
        let bg = "#0f0f20";
        let border = "#1e1e35";
        let color = "#555";
        if (notFound) {
          bg = "#1a0a0a";
          border = "#f87171";
          color = "#f87171";
        } else if (i === mid) {
          bg = found ? "#0d2d1a" : "#1e1040";
          border = found ? "#4ade80" : "#a78bfa";
          color = found ? "#4ade80" : "#fff";
        } else if (!notFound && i >= lo && i <= hi) {
          bg = "#0f0f20";
          border = "#2a2a45";
          color = "#888";
        }
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border-2"
              style={{
                background: bg,
                borderColor: border,
                color,
                transition: "all 0.25s",
              }}
            >
              {val}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: i === mid ? "#a78bfa" : "#333", minHeight: 14 }}
            >
              {i === mid
                ? "mid"
                : i === lo && lo === hi
                  ? "lo=hi"
                  : i === lo
                    ? "lo"
                    : i === hi
                      ? "hi"
                      : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── BFS VIZ ────────────────────────────────────────────────────────────
const NODE_POS = {
  0: { x: 50, y: 12 },
  1: { x: 22, y: 38 },
  2: { x: 78, y: 38 },
  3: { x: 8, y: 70 },
  4: { x: 36, y: 70 },
  5: { x: 78, y: 70 },
};
const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [4, 5],
];

function BfsViz({ step }) {
  if (!step) return null;
  const { visited, current, order } = step;
  const safeVisited = visited instanceof Set ? visited : new Set();
  return (
    <div className="flex flex-col items-center gap-4 w-full px-4 py-2">
      <svg
        viewBox="0 0 100 85"
        style={{ width: "100%", maxWidth: 320, height: "auto" }}
      >
        {EDGES.map(([a, b], i) => {
          const p1 = NODE_POS[a];
          const p2 = NODE_POS[b];
          const active = safeVisited.has(a) && safeVisited.has(b);
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={active ? "#7c3aed" : "#2a2a45"}
              strokeWidth={active ? 1 : 0.6}
            />
          );
        })}
        {Object.entries(NODE_POS).map(([id, { x, y }]) => {
          const n = Number(id);
          const isCurrent = current === n;
          const isVisited = safeVisited.has(n) && !isCurrent;
          let fill = "#0a0a18";
          let stroke = "#2a2a45";
          let textFill = "#555";
          if (isCurrent) {
            fill = "#3c1f78";
            stroke = "#a78bfa";
            textFill = "#fff";
          } else if (isVisited) {
            fill = "#1a1a2e";
            stroke = "#7c3aed";
            textFill = "#a78bfa";
          }
          return (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={7}
                fill={fill}
                stroke={stroke}
                strokeWidth={0.8}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={4}
                fontWeight="700"
                fill={textFill}
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
      {order && order.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-xs text-[#444]">Order:</span>
          {order.map((n, i) => (
            <span
              key={i}
              className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1e1040] text-[#a78bfa]"
            >
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── LINKED LIST VIZ ───────────────────────────────────────────────────
const LL_DATA = [12, 37, 25, 8, 51, 19, 44];

function LinkedViz({ step }) {
  if (!step) return null;
  const { current } = step;
  return (
    <div className="w-full overflow-x-auto py-4">
      <div
        className="flex items-center justify-start md:justify-center gap-1 px-4"
        style={{ minWidth: "max-content", margin: "0 auto" }}
      >
        {LL_DATA.map((val, i) => {
          const isCurrent = current === i;
          const isPast = current === -1 || i < current;
          let borderCol = "#2a2a45";
          let bgCol = "#0f0f20";
          let textCol = "#444";
          if (isCurrent) {
            borderCol = "#a78bfa";
            bgCol = "#2a1060";
            textCol = "#fff";
          } else if (isPast) {
            borderCol = "#7c3aed";
            bgCol = "#1a1a2e";
            textCol = "#a78bfa";
          }
          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className="h-4 flex items-center">
                  {isCurrent ? (
                    <span className="text-[10px] text-[#a78bfa] font-semibold">
                      curr
                    </span>
                  ) : (
                    <span className="text-[10px] text-transparent">·</span>
                  )}
                </div>
                <div
                  className="flex rounded-lg border-2 overflow-hidden"
                  style={{ borderColor: borderCol }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center text-sm font-bold"
                    style={{ background: bgCol, color: textCol }}
                  >
                    {val}
                  </div>
                  <div
                    className="w-5 h-10 flex items-center justify-center border-l-2"
                    style={{ borderColor: borderCol, background: bgCol }}
                  >
                    <span className="text-[8px]" style={{ color: textCol }}>
                      {i < LL_DATA.length - 1 ? "→" : "∅"}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#333]">[{i}]</span>
              </div>
              {i < LL_DATA.length - 1 && (
                <span className="text-[#2a2a45] text-lg font-bold mx-1 mb-1">
                  →
                </span>
              )}
            </div>
          );
        })}
        <div className="flex items-center ml-1 mb-1">
          <span className="text-[#2a2a45] text-lg font-bold mx-1">→</span>
          <span className="text-xs font-mono text-[#555] border border-[#2a2a45] rounded-lg px-2 py-1">
            NULL
          </span>
        </div>
      </div>
    </div>
  );
}

// ── ALGOS CONFIG ──────────────────────────────────────────────────────
const ALGOS = [
  { id: "bubble", label: "Bubble Sort", time: "O(n²)", space: "O(1)" },
  { id: "binary", label: "Binary Search", time: "O(log n)", space: "O(1)" },
  { id: "bfs", label: "BFS Graph", time: "O(V+E)", space: "O(V)" },
  { id: "linked", label: "Linked List", time: "O(n)", space: "O(1)" },
];

const BUBBLE_INPUT = [64, 34, 25, 12, 22, 11, 90];
const BINARY_ARR = [11, 12, 22, 25, 34, 64, 90];

// ── MAIN ──────────────────────────────────────────────────────────────
export default function Visualizer() {
  const [algo, setAlgo] = useState("bubble");
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [bsTarget, setBsTarget] = useState(25);
  const timer = useRef(null);

  const buildSteps = (id, target) => {
    if (id === "bubble") return getBubbleSteps(BUBBLE_INPUT);
    if (id === "binary") return getBinarySteps(BINARY_ARR, target);
    if (id === "bfs") return getBfsSteps();
    if (id === "linked") return getLinkedSteps(LL_DATA);
    return [];
  };

  useEffect(() => {
    clearInterval(timer.current);
    setPlaying(false);
    const s = buildSteps(algo, bsTarget);
    setSteps(s);
    setIdx(0);
  }, [algo, bsTarget]);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIdx((i) => {
          if (i >= steps.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer.current);
  }, [playing, speed, steps.length]);

  const reset = () => {
    clearInterval(timer.current);
    setPlaying(false);
    setIdx(0);
  };
  const prev = () => {
    clearInterval(timer.current);
    setPlaying(false);
    setIdx((i) => Math.max(0, i - 1));
  };
  const next = () => {
    clearInterval(timer.current);
    setPlaying(false);
    setIdx((i) => Math.min(steps.length - 1, i + 1));
  };
  const toggle = () => setPlaying((p) => !p);

  const step = steps[idx] || null;
  const current = ALGOS.find((a) => a.id === algo);
  const msg = step?.msg || "Press Play to start";

  return (
    <Layout>
      <div className="min-h-screen bg-[#080812] p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Algorithm Visualizer
          </h1>
          <p className="text-sm text-[#555]">
            Watch algorithms execute step by step
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* ── Sidebar controls ── */}
          <div className="flex flex-col gap-4 w-full xl:w-64 shrink-0">
            {/* Algo picker */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
              <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-3">
                Algorithm
              </p>
              <div className="flex flex-col gap-1">
                {ALGOS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAlgo(a.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all text-left border cursor-pointer
                      ${
                        algo === a.id
                          ? "bg-[#1e1040] border-[#7c3aed] text-[#a78bfa]"
                          : "bg-transparent border-transparent text-[#555] hover:bg-[#1a1a2e] hover:text-[#888]"
                      }`}
                  >
                    <span>{a.label}</span>
                    <span className="text-[11px] opacity-60 font-mono">
                      {a.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Binary search target input */}
            {algo === "binary" && (
              <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
                <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-3">
                  Search target
                </p>
                <input
                  type="number"
                  value={bsTarget}
                  onChange={(e) => setBsTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#080812] border border-[#2a2a45] text-white text-sm outline-none focus:border-[#7c3aed] transition-colors"
                />
                <p className="text-[11px] text-[#333] mt-2">
                  Sorted array: [11,12,22,25,34,64,90]
                </p>
              </div>
            )}

            {/* Complexity */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
              <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-3">
                Complexity
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-[#555] mb-1">Time</p>
                  <p className="text-sm font-bold text-[#a78bfa]">
                    {current.time}
                  </p>
                </div>
                <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-[#555] mb-1">Space</p>
                  <p className="text-sm font-bold text-[#a78bfa]">
                    {current.space}
                  </p>
                </div>
              </div>
            </div>

            {/* Speed */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
              <p className="text-[10px] font-semibold text-[#444] uppercase tracking-widest mb-3">
                Speed
              </p>
              <div className="flex gap-2">
                {[
                  ["Slow", 1000],
                  ["Normal", 600],
                  ["Fast", 200],
                ].map(([label, val]) => (
                  <button
                    key={val}
                    onClick={() => setSpeed(val)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer
                      ${
                        speed === val
                          ? "bg-[#1e1040] border-[#7c3aed] text-[#a78bfa]"
                          : "bg-transparent border-[#1e1e35] text-[#555] hover:border-[#2a2a45] hover:text-[#888]"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main canvas ── */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Viz card */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e35]">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {current.label}
                  </p>
                  <p className="text-xs text-[#555] mt-0.5 font-mono">{msg}</p>
                </div>
                <span className="text-xs text-[#333] font-mono bg-[#080812] px-3 py-1 rounded-lg border border-[#1e1e35]">
                  {idx + 1} / {steps.length}
                </span>
              </div>

              <div
                className="flex items-center justify-center"
                style={{ minHeight: 280 }}
              >
                {algo === "bubble" && (
                  <div className="w-full">
                    <BubbleViz step={step} />
                  </div>
                )}
                {algo === "binary" && (
                  <div className="w-full">
                    <BinaryViz step={step} />
                  </div>
                )}
                {algo === "bfs" && <BfsViz step={step} />}
                {algo === "linked" && (
                  <div className="w-full">
                    <LinkedViz step={step} />
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#333] font-mono w-4 text-right">
                  1
                </span>
                <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: steps.length
                        ? `${((idx + 1) / steps.length) * 100}%`
                        : "0%",
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#333] font-mono w-4">
                  {steps.length}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl px-5 py-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={reset}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#080812] border border-[#2a2a45] text-[#555] hover:text-[#888] hover:border-[#3a3a55] transition-all cursor-pointer"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={prev}
                  disabled={idx === 0}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#080812] border border-[#2a2a45] text-[#555] hover:text-[#888] hover:border-[#3a3a55] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  onClick={toggle}
                  disabled={idx >= steps.length - 1}
                  className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-90 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  }}
                >
                  {playing ? "⏸ Pause" : "▶ Play"}
                </button>
                <button
                  onClick={next}
                  disabled={idx >= steps.length - 1}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[#080812] border border-[#2a2a45] text-[#555] hover:text-[#888] hover:border-[#3a3a55] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
