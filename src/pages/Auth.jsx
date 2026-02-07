import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import SideTab from "../components/SideTab.jsx";
import castlyLogo from "../assets/castly-logo.png";

export default function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [intent, setIntent] = useState("work"); // work | inspo (signup only)
  const [city, setCity] = useState(""); // signup only

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false;
    if (password.length < 6) return false;
    if (mode === "signup" && password !== confirm) return false;
    return true;
  }, [email, password, confirm, mode]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!canSubmit) return;

    setLoading(true);
    try {
      // Hackathon mode: simulate auth (swap later with FastAPI/Flask)
      localStorage.setItem("castly_token", "demo-token");
      localStorage.setItem(
        "castly_bootstrap",
        JSON.stringify({ email: email.trim(), intent, city })
      );

      if (mode === "signup") nav("/onboarding");
      else nav("/home");
    } catch {
      setErr("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
  <>
    <SideTab />
    <div className="authPage">
    <div className="authCard">
      <div className="authLogoWrap">
        <img
          src={castlyLogo}
          alt="CASTLY"
          className="authLogoImg"
        />
      </div>

      <div className="authTabs">
        <button
          type="button"
          className={`authTab ${mode === "login" ? "active" : ""}`}
          onClick={() => setMode("login")}
        >
          Log in
        </button>
        <button
          type="button"
          className={`authTab ${mode === "signup" ? "active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="authIntro">
        <h1 className="authTitle">{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p className="authSubtitle">
          {mode === "login" ? "Sign in to continue" : "Join creators near you."}
        </p>
      </div>

      <form className="authForm" onSubmit={onSubmit}>
        <input
          className="authInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
          autoComplete="email"
        />

        <input
          className="authInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {mode === "signup" && (
          <input
            className="authInput"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            type="password"
            autoComplete="new-password"
          />
        )}

        {err && <div className="authError">{err}</div>}

        <button className="authPrimaryBtn" disabled={!canSubmit || loading}>
          {loading ? "..." : mode === "login" ? "Log in" : "Create Account"}
        </button>
        
        {mode === "login" && (
          <a className="authLink" href="#">
            Forgot password?
          </a>
        )}
      </form>
    </div>
    </div>
  </>
);

}