import { Link } from "react-router-dom";

export default function Landing() {
  const features = [
    {
      icon: "⚡",
      title: "AI Code Analyzer",
      desc: "Paste any solution and get instant time/space complexity, pattern detection, and Socratic hints — powered by Gemini.",
    },
    {
      icon: "▶",
      title: "Algorithm Visualizer",
      desc: "Watch Bubble Sort, Binary Search, BFS, and Linked List execute step by step with interactive animations.",
    },
    {
      icon: "📊",
      title: "Weakness Dashboard",
      desc: "Track your performance across topics. See exactly where you struggle so you stop wasting time.",
    },
    {
      icon: "🗺",
      title: "AI Study Roadmap",
      desc: "Get a personalized day-by-day plan generated from your weak topics. Study smarter, not harder.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Paste your code",
      desc: "Drop any DSA solution into the editor",
    },
    {
      num: "02",
      title: "Get AI analysis",
      desc: "Gemini returns complexity, patterns and hints",
    },
    {
      num: "03",
      title: "Visualize it",
      desc: "Watch the algorithm execute step by step",
    },
    {
      num: "04",
      title: "Follow your roadmap",
      desc: "Study your weak topics with a daily plan",
    },
  ];

  const stats = [
    { val: "10+", label: "Algorithms visualized" },
    { val: "O(1)", label: "Time to get feedback" },
    { val: "AI", label: "Powered by Gemini" },
    { val: "100%", label: "Free to use" },
  ];

  return (
    <div className="min-h-screen bg-[#080812] font-['Inter'] overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-[#1e1e35]">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
          >
            ⚡
          </div>
          <span className="text-base font-bold text-white">
            Algo<span className="text-[#a78bfa]">Mentor</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-sm font-medium text-[#555] hover:text-white transition-colors no-underline"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white no-underline hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a45] bg-[#1a1a2e] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="text-xs font-medium text-[#888]">
            Powered by Google Gemini AI
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
          Your AI-powered <span className="text-[#a78bfa]">DSA coach</span> for
          cracking interviews
        </h1>

        <p className="text-base md:text-lg text-[#555] max-w-xl leading-relaxed mb-10">
          Analyze your code, visualize algorithms step by step, track your weak
          topics, and get a personalized AI study roadmap — all in one place.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            to="/register"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white no-underline hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
          >
            Start for free →
          </Link>
          <Link
            to="/login"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-[#555] border border-[#2a2a45] hover:border-[#3a3a55] hover:text-[#888] transition-all no-underline"
          >
            Sign in
          </Link>
        </div>

        {/* Hero card preview */}
        <div className="mt-16 w-full max-w-3xl bg-[#0f0f20] border border-[#1e1e35] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e1e35] bg-[#0a0a18]">
            <div className="w-3 h-3 rounded-full bg-[#f87171]" />
            <div className="w-3 h-3 rounded-full bg-[#fb923c]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
            <span className="ml-3 text-xs text-[#333] font-mono">
              algomentor.app — analyze.jsx
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Editor side */}
            <div className="border-r border-[#1e1e35] p-5 font-mono text-xs leading-7">
              <div>
                <span className="text-[#555]">1</span>{" "}
                <span className="text-[#c084fc]">function</span>{" "}
                <span className="text-[#60a5fa]">twoSum</span>
                <span className="text-white">(nums, target) {"{"}</span>
              </div>
              <div>
                <span className="text-[#555]">2</span>{" "}
                <span className="text-[#c084fc]">for</span>{" "}
                <span className="text-white">(let i = </span>
                <span className="text-[#34d399]">0</span>
                <span className="text-white">
                  ; i &lt; nums.length; i++) {"{"}
                </span>
              </div>
              <div>
                <span className="text-[#555]">3</span>{" "}
                <span className="text-[#c084fc]">for</span>{" "}
                <span className="text-white">(let j = i+</span>
                <span className="text-[#34d399]">1</span>
                <span className="text-white">
                  ; j &lt; nums.length; j++) {"{"}
                </span>
              </div>
              <div>
                <span className="text-[#555]">4</span>{" "}
                <span className="text-[#c084fc]">if</span>{" "}
                <span className="text-white">
                  (nums[i] + nums[j] === target)
                </span>
              </div>
              <div>
                <span className="text-[#555]">5</span>{" "}
                <span className="text-[#c084fc]">return</span>{" "}
                <span className="text-white">[i, j];</span>
              </div>
              <div>
                <span className="text-[#555]">6</span>{" "}
                <span className="text-white">{"}"}</span>
              </div>
              <div>
                <span className="text-[#555]">7</span>{" "}
                <span className="text-white">{"}"}</span>
              </div>
              <div>
                <span className="text-[#555]">8</span>{" "}
                <span className="text-white">{"}"}</span>
              </div>
            </div>
            {/* Result side */}
            <div className="p-5 flex flex-col gap-4">
              <div className="text-center">
                <p className="text-[10px] text-[#555] uppercase tracking-widest mb-1">
                  Score
                </p>
                <p className="text-4xl font-bold text-[#fb923c]">42</p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-[#555] mb-1">Time</p>
                  <p className="text-sm font-bold text-[#a78bfa]">O(n²)</p>
                </div>
                <div className="flex-1 bg-[#080812] border border-[#1e1e35] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-[#555] mb-1">Space</p>
                  <p className="text-sm font-bold text-[#a78bfa]">O(1)</p>
                </div>
              </div>
              <div className="bg-[#1e1040] rounded-xl p-3">
                <p className="text-[10px] text-[#a78bfa] font-semibold mb-1">
                  Hint 1
                </p>
                <p className="text-[11px] text-[#888] leading-relaxed">
                  What data structure gives O(1) lookup? Think about storing
                  complements.
                </p>
              </div>
              <div className="flex gap-1 flex-wrap">
                <span className="text-[10px] px-2 py-1 rounded-full bg-[#1e1040] text-[#a78bfa]">
                  Brute force
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-[#1e1040] text-[#a78bfa]">
                  Hash map opportunity
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 md:px-16 py-12 border-y border-[#1e1e35]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ val, label }, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{val}</p>
              <p className="text-xs text-[#555]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              Everything you need to crack DSA
            </h2>
            <p className="text-[#555] text-sm max-w-md mx-auto">
              Four powerful tools working together to make you a better problem
              solver
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6 hover:border-[#2a2a45] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 bg-[#1a1a2e]">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 md:px-16 py-20 border-t border-[#1e1e35]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
            <p className="text-[#555] text-sm">
              Four steps to become interview-ready
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white mb-4"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                  }}
                >
                  {num}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute mt-6 ml-32 w-16 h-px bg-[#1e1e35]" />
                )}
                <h3 className="text-sm font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-xs text-[#555] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-16 py-20 border-t border-[#1e1e35]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-3xl p-10 md:p-14">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to level up your DSA?
            </h2>
            <p className="text-[#555] text-sm mb-8 leading-relaxed">
              Join and start analyzing your code with AI today. Completely free.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 rounded-xl text-sm font-semibold text-white no-underline hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
            >
              Get started for free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-16 py-8 border-t border-[#1e1e35]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
            >
              ⚡
            </div>
            <span className="text-sm font-bold text-white">
              Algo<span className="text-[#a78bfa]">Mentor</span>
            </span>
          </div>
          <p className="text-xs text-[#333]">
            Built with React, Node.js, MongoDB & Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
