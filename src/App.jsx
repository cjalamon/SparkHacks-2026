import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Events from "./pages/events.jsx";
import Profile from "./pages/profile.jsx";
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";

// ProtectedRoute component to check authentication
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("castly_token");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}