import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <rect x="1" y="1" width="5" height="5" rx="1" />
        <rect x="10" y="1" width="5" height="5" rx="1" />
        <rect x="1" y="10" width="5" height="5" rx="1" />
        <rect x="10" y="10" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    path: "/leaderboard",
    label: "Leaderboard",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <path d="M3 14h10" />
        <path d="M5 14V8" />
        <path d="M8 14V4" />
        <path d="M11 14V6" />
      </svg>
    ),
  },
  {
    path: "/analyze",
    label: "Analyze Code",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <polyline points="4 10 4 13" />
        <polyline points="8 6 8 13" />
        <polyline points="12 3 12 13" />
      </svg>
    ),
  },
  {
    path: "/visualizer",
    label: "Visualizer",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <polygon points="4,2 12,8 4,14" />
      </svg>
    ),
  },
  {
    path: "/interview",
    label: "Interview",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <path d="M2 3h12v8H6l-4 3V3z" />
      </svg>
    ),
  },
  {
    path: "/history",
    label: "History",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <path d="M2 4h12M2 8h8M2 12h10" />
      </svg>
    ),
  },
  {
    path: "/roadmap",
    label: "Roadmap",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6Z" />
      </svg>
    ),
  },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#080812] overflow-hidden font-['Inter']">
      {/* Sidebar */}
      <aside className="w-56 bg-white dark:bg-[#0a0a18] border-r border-[#1e1e35] flex flex-col shrink-0">
        {/* Logo + Theme Toggle */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#1e1e35]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-sm shrink-0">
              ⚡
            </div>

            <span className="text-sm font-bold text-[#111827] dark:text-white">
              Algo<span className="text-[#a78bfa]">Mentor</span>
            </span>
          </div>

          <ThemeToggle />
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3">
          <p className="text-[10px] font-semibold text-[#333] uppercase tracking-widest px-3 mt-2 mb-3">
            Main
          </p>
          {NAV.map(({ path, label, icon }) => {
            const active = pathname === path;
            return (
              <Link key={path} to={path} className="no-underline block mb-1">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${active ? "bg-[#1a1a2e] text-[#a78bfa]" : "text-[#555] hover:bg-[#1a1a2e] hover:text-[#888]"}`}
                >
                  {icon} {label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-[#1e1e35] p-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-[#1e1e35] flex items-center justify-center text-xs font-bold text-[#a78bfa] shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-[#555] flex-1 truncate">
              {user?.name}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-[#444] hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer text-base"
            >
              Logout ↩
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
