import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

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
    <div className="auth">
      <div className="authShell">
        <div className="brand">
          <div className="logo">C</div>
          <div className="brandText">
            <div className="name">CASTLY</div>
            <div className="tagline">Link up with creators near you.</div>
          </div>
        </div>

        <div className="card">
          <div className="tabs">
            <button
              className={`tab ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
              type="button"
            >
              Log in
            </button>
            <button
              className={`tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign up
            </button>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min 6 characters"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </label>

            {mode === "signup" && (
              <>
                <label className="field">
                  <span>Confirm password</span>
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="repeat password"
                    type="password"
                    autoComplete="new-password"
                  />
                </label>

                <div className="pillRow">
                  <button
                    type="button"
                    className={`pill ${intent === "work" ? "pillActive" : ""}`}
                    onClick={() => setIntent("work")}
                  >
                    Looking to Work
                  </button>
                  <button
                    type="button"
                    className={`pill ${intent === "inspo" ? "pillActive" : ""}`}
                    onClick={() => setIntent("inspo")}
                  >
                    Looking for Inspo
                  </button>
                </div>

                <label className="field">
                  <span>City</span>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Chicago, IL"
                    autoComplete="address-level2"
                  />
                </label>
              </>
            )}

            {err && <div className="alert err">{err}</div>}

            <button className="primary" disabled={!canSubmit || loading}>
              {loading ? "..." : mode === "login" ? "Continue" : "Create account"}
            </button>

            <div className="tiny">
              {mode === "signup"
                ? "Next: build your profile (links, clips, role)."
                : "No account? Hit Sign up."}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}