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

  // Signup additional fields
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [bio, setBio] = useState("");
  const [intent, setIntent] = useState("work"); // work | inspo (signup only)
  const [city, setCity] = useState(""); // signup only

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false;
    if (password.length < 6) return false;
    if (mode === "signup") {
      if (password !== confirm) return false;
      if (!name.trim()) return false;
    }
    return true;
  }, [email, password, confirm, mode, name]);

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

        // Create new user account
        const newUser = {
          email: email.trim(),
          password, // In production, this would be hashed
          name,
          pronouns,
          creativeType,
          bio,
          intent,
          city,
        };

        // Save user to users list
        const users = getAllUsers();
        users.push(newUser);
        localStorage.setItem("castly_users", JSON.stringify(users));

        // Log in the user
        localStorage.setItem("castly_token", "demo-token");
        localStorage.setItem("castly_current_user", email.trim());
        localStorage.setItem(
          "castly_profile",
          JSON.stringify(newUser)
        );

        nav("/home");
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

        {mode === "signup" && (
          <>
            <input
              className="authInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              autoComplete="name"
            />
            <input
              className="authInput"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="Pronouns (e.g., she/her, they/them)"
              autoComplete="off"
            />
            <input
              className="authInput"
              value={creativeType}
              onChange={(e) => setCreativeType(e.target.value)}
              placeholder="Creative Type (e.g., Filmmaker, Designer)"
              autoComplete="off"
            />
            <textarea
              className="authInput"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio/About yourself"
              rows="3"
              style={{ resize: "vertical" }}
            />
            <select
              className="authInput"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
            >
              <option value="work">Looking for Work</option>
              <option value="inspo">Looking for Inspiration</option>
            </select>
            <input
              className="authInput"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              autoComplete="off"
            />
          </>
        )}

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