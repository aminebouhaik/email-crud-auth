import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/register", { email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container register">
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <div className="auth-wrapper">
        <div className="auth-card register">
          <div className="auth-card-header"></div>

          <div className="auth-card-body">
            <div className="auth-logo">🚀</div>
            <h1 className="auth-title">Join Us</h1>
            <p className="auth-subtitle">dakhal ismak</p>

            {error && (
              <div className="error-alert shake">
                <span className="error-icon">⚠️</span>
                <p className="error-message">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-wrapper">
                  <span className="form-icon">📧</span>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="form-input" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <span className="form-icon">🔒</span>
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="form-input" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="form-input-toggle">{showPassword ? "👁️" : "👁️‍🗨️"}</button>
                </div>
                <p className="form-helper">Minimum 6 characters</p>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="form-input-wrapper">
                  <span className="form-icon">✓</span>
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} className="form-input" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="form-input-toggle">{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="form-submit">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line"></div>
            </div>

            <p className="auth-link-group">
              Already have an account? <Link to="/" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>

        <p className="auth-footer">✨ Join thousands of users managing their emails</p>
      </div>
    </div>
  );
}

export default Register;