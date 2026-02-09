import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(name, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.message?.includes("User already exists")) {
        setError("Account already exists. Please sign in.");
        setRedirecting(true);
      } else {
        setError(err.message || "Unable to register. Try another email.");
      }
    }
  };

  useEffect(() => {
    if (!redirecting) return;
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [redirecting, navigate]);

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Create account</h2>
        <p>Start assessing your financial health in minutes.</p>
        <form className="stack" onSubmit={onSubmit}>
          <label className="stack">
            Full name
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
          {error ? (
            <div className="error">
              {error}{" "}
              {error.includes("Account already exists") ? (
                <>
                  <Link to="/login">Go to sign in</Link>
                  <span className="muted"> (redirecting...)</span>
                </>
              ) : null}
            </div>
          ) : null}
          <button className="primary-btn" type="submit">
            Create account
          </button>
        </form>
        <div className="muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
