import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/emails");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container login">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-card-header"></div>

          <div className="auth-card-body">
            <div className="auth-logo">??</div>

            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>

            {error && (
              <div className="error-alert shake">
                <span className="error-icon">??</span>
                <p className="error-message">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-wrapper">
                  <span className="form-icon">??</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <span className="form-icon">??</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="form-input-toggle"
                  >
                    {showPassword ? "???" : "???????"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="form-submit"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line"></div>
            </div>

            <p className="auth-link-group">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="auth-footer">
          ?? Your credentials are secure and encrypted
        </p>
      </div>
    </div>
  );
}

export default Login;
