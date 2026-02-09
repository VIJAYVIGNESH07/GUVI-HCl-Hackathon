import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Check credentials.");
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Sign in</h2>
        <p>Access your financial health dashboard.</p>
        <form className="stack" onSubmit={onSubmit}>
          <label className="stack">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="stack">
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <div className="error">{error}</div> : null}
          <button className="primary-btn" type="submit">
            Sign in
          </button>
        </form>
        <div className="muted">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
