import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-xl border border-[#2a2a45] 
                 bg-white text-black
                 dark:bg-[#0f0f20] dark:text-white"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
