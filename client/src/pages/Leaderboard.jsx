import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <Layout>
      <div className="p-8 min-h-screen bg-[#080812]">
        <h1 className="text-2xl font-bold text-white mb-6">Leaderboard</h1>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4"
            >
              <div className="flex justify-between items-center">
                <p className="text-white font-semibold">
                  #{user.rank} {user.name}
                </p>

                <p className="text-[#a78bfa] font-bold">{user.xp} XP</p>
              </div>

              <p className="text-sm text-[#888] mt-2">
                Level {user.level} • 🔥 {user.streak} day streak
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
