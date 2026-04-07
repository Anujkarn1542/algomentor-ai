import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const raw = params.get("user");
    if (raw) {
      try {
        const user = JSON.parse(decodeURIComponent(raw));
        login(user);
        navigate("/dashboard");
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080812]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#555]">Signing you in with Google...</p>
      </div>
    </div>
  );
}
