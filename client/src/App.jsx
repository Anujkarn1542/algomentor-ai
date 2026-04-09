import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Visualizer from "./pages/Visualizer";
import History from "./pages/History";
import Roadmap from "./pages/Roadmap";
import AuthCallback from "./pages/AuthCallback";
import Leaderboard from "./pages/Leaderboard";
import Interview from "./pages/Interview";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/analyze"
        element={
          <PrivateRoute>
            <Analyze />
          </PrivateRoute>
        }
      />
      <Route
        path="/visualizer"
        element={
          <PrivateRoute>
            <Visualizer />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <PrivateRoute>
            <Roadmap />
          </PrivateRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/interview"
        element={
          <PrivateRoute>
            <Interview />
          </PrivateRoute>
        }
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
