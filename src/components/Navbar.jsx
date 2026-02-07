import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="profile-btn" onClick={() => nav("/profile")}>
          👤 Profile
        </button>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("castly_token");
          localStorage.removeItem("castly_bootstrap");
          localStorage.removeItem("castly_profile");
          nav("/auth");
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
