import "./Auth.css";

export default function Auth() {
  return (
    <div className="auth">
      <div className="authShell">
        <h1>CASTLY</h1>
        <p>Match with creators near you</p>

        <input placeholder="Email" />
        <input placeholder="Password" type="password" />

        <button>Log in</button>
        <button>Create account</button>
      </div>
    </div>
  );
}