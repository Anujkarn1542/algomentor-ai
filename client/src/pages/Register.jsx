import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full name",
      key: "name",
      type: "text",
      ph: "Enter your full name",
    },
    {
      label: "Email address",
      key: "email",
      type: "email",
      ph: "you@example.com",
    },
    { label: "Password", key: "password", type: "password", ph: "••••••••" },
  ];

  return (
    <div className="min-h-screen bg-[#080812] flex items-center justify-center px-6 font-['Inter']">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-xl">
            ⚡
          </div>
          <span className="text-xl font-bold text-white">
            Algo<span className="text-[#a78bfa]">Mentor</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
          <p className="text-sm text-[#555] mb-7">
            Start your AlgoMentor AI journey
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm text-red-400 bg-red-500/10 border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map(({ label, key, type, ph }) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold text-[#555] uppercase tracking-widest">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#080812] border border-[#2a2a45] text-white placeholder-[#333] text-sm outline-none focus:border-[#7c3aed] transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-linear-to-r from-[#7c3aed] to-[#a78bfa] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-4 text-gray-600 dark:text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <a
            href="http://localhost:5000/api/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-300 transition"
          >
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </a>

          <p className="text-center text-xs text-[#555] mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#a78bfa] font-medium hover:text-[#c084fc] transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
