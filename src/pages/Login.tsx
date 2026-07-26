import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Send login request to backend
      const response = await fetch(
        "https://bhumimitra-backend.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // ==========================================
      // LOGIN SUCCESS
      // ==========================================

      console.log("Login successful:", data);

      // Save JWT token
      localStorage.setItem(
        "bhumiMitraToken",
        data.token
      );

      // Save complete user object
      localStorage.setItem(
        "bhumiMitraUser",
        JSON.stringify(data.user)
      );

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to the backend. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      {/* Background */}
      <div className="login-bg-glow glow-one"></div>
      <div className="login-bg-glow glow-two"></div>
      <div className="login-bg-glow glow-three"></div>

      <div className="login-grid"></div>

      {/* Login Card */}
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="brand-icon">
            🌱
          </div>

          <span>
            BhumiMitra
          </span>
        </div>

        {/* Header */}
        <div className="login-header">

          <div className="welcome-badge">
            <span className="status-dot"></span>
            Secure Access
          </div>

          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>
            Sign in to continue managing your
            land records with BhumiMitra.
          </p>

        </div>

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* Error */}
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          {/* Email */}
          <div className="login-field">

            <label>
              Email Address
            </label>

            <div className="input-box">

              <Mail size={19} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
              />

            </div>

          </div>

          {/* Password */}
          <div className="login-field">

            <div className="password-label">

              <label>
                Password
              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <div className="input-box">

              <Lock size={19} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Remember Me */}
          <div className="remember-row">

            <label className="remember-label">

              <input
                type="checkbox"
              />

              <span className="custom-checkbox"></span>

              Remember me

            </label>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            <span>
              {loading
                ? "Signing In..."
                : "Sign In"}
            </span>

            {!loading && (
              <ArrowRight size={19} />
            )}

          </button>

          {/* Divider */}
          <div className="login-divider">
            <span>
              OR CONTINUE WITH
            </span>
          </div>

          {/* Google */}
          <button
            type="button"
            className="google-btn"
            onClick={() =>
              alert(
                "Google Login will be added later."
              )
            }
          >

            <div className="google-icon">
              G
            </div>

            <span>
              Continue with Google
            </span>

          </button>

          {/* Register */}
          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </p>

        </form>

        {/* Security Footer */}
        <div className="login-security">

          <ShieldCheck size={16} />

          <span>
            Your data is protected with
            secure authentication
          </span>

        </div>

      </div>

    </section>
  );
}

export default Login;