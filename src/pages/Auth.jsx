import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import castlyLogo from "../assets/castly-logo.png";

export default function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false;
    if (password.length < 6) return false;
    if (mode === "signup" && password !== confirm) return false;
    return true;
  }, [email, password, confirm, mode]);

  // Get all registered users
  function getAllUsers() {
    try {
      return JSON.parse(localStorage.getItem("castly_users") || "[]");
    } catch {
      return [];
    }
  }

  // Find user by email
  function findUserByEmail(userEmail) {
    const users = getAllUsers();
    return users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!canSubmit) return;

    setLoading(true);
    try {
      if (mode === "signup") {
        // Check if email already exists
        if (findUserByEmail(email.trim())) {
          setErr("Email already registered. Please log in or use a different email.");
          setLoading(false);
          return;
        }

        // Create new user account with just email and password
        const newUser = {
          email: email.trim(),
          password, // In production, this would be hashed
          name: "",
          pronouns: "",
          creativeType: "",
          bio: "",
          skills: [],
          experiences: [],
        };

        // Save user to users list
        const users = getAllUsers();
        users.push(newUser);
        localStorage.setItem("castly_users", JSON.stringify(users));

        // Set current user and token
        localStorage.setItem("castly_token", "demo-token");
        localStorage.setItem("castly_current_user", email.trim());

        // Go to onboarding
        nav("/onboarding");
      } else {
        // Login mode
        const user = findUserByEmail(email.trim());

        if (!user || user.password !== password) {
          setErr("Incorrect email or password. Try Again");
          setLoading(false);
          return;
        }

        // Log in the user
        localStorage.setItem("castly_token", "demo-token");
        localStorage.setItem("castly_current_user", email.trim());
        localStorage.setItem("castly_profile", JSON.stringify(user));

        nav("/home");
      }
    } catch (error) {
      setErr("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
  <>
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
          placeholder="Email"
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