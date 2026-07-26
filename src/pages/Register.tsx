import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

function Register() {

  // ==========================================
  // FORM STATES
  // ==========================================

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  // ==========================================
  // UI STATES
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // ==========================================
  // REGISTER USER
  // ==========================================

  const handleRegister = async (
    event: React.FormEvent
  ) => {

    // Prevent page refresh
    event.preventDefault();

    // Clear previous messages
    setMessage("");
    setError("");


    // ========================================
    // VALIDATION
    // ========================================

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Please fill in all fields."
      );

      return;
    }


    // ========================================
    // PASSWORD VALIDATION
    // ========================================

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    // ========================================
    // TERMS VALIDATION
    // ========================================

    if (!termsAccepted) {

      setError(
        "Please accept the Terms & Conditions."
      );

      return;
    }


    try {

      // Show loading
      setLoading(true);


      // ======================================
      // SEND DATA TO BACKEND
      // ======================================

      const response =
        await fetch(
          "https://bhumimitra-backend.onrender.com/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              phone,
              password,
            }),
          }
        );


      // Convert response to JSON

      const data =
        await response.json();


      // ======================================
      // HANDLE ERROR RESPONSE
      // ======================================

      if (!response.ok) {

        setError(
          data.message ||
          "Registration failed."
        );

        return;
      }


      // ======================================
      // SUCCESS
      // ======================================

      setMessage(
        data.message ||
        "Registration successful!"
      );


      // Clear form

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);


    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );

      setError(
        "Unable to connect to the backend."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <section className="register-page">

      <div className="register-card">

        <h1 className="register-title">
          Create Account 🌱
        </h1>

        <p className="register-subtitle">
          Join BhumiMitra to access digital land services
        </p>


        {/* =================================
            SUCCESS MESSAGE
        ================================== */}

        {message && (

          <div className="register-success">

            ✅ {message}

          </div>

        )}


        {/* =================================
            ERROR MESSAGE
        ================================== */}

        {error && (

          <div className="register-error">

            ⚠️ {error}

          </div>

        )}


        {/* =================================
            FORM
        ================================== */}

        <form
          onSubmit={
            handleRegister
          }
        >


          {/* Full Name */}

          <div className="register-field">

            <label>
              Full Name
            </label>

            <div className="register-input">

              <User size={20} />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Email */}

          <div className="register-field">

            <label>
              Email Address
            </label>

            <div className="register-input">

              <Mail size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Phone */}

          <div className="register-field">

            <label>
              Mobile Number
            </label>

            <div className="register-input">

              <Phone size={20} />

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Password */}

          <div className="register-field">

            <label>
              Password
            </label>

            <div className="register-input">

              <Lock size={20} />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Confirm Password */}

          <div className="register-field">

            <label>
              Confirm Password
            </label>

            <div className="register-input">

              <Lock size={20} />

              <input
                type="password"
                placeholder="Confirm password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Checkbox */}

          <label className="terms">

            <input
              type="checkbox"
              checked={
                termsAccepted
              }
              onChange={(e) =>
                setTermsAccepted(
                  e.target.checked
                )
              }
            />

            I agree to the Terms & Conditions

          </label>


          {/* Register Button */}

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

        </form>


        {/* Divider */}

        <div className="register-divider">

          <span>
            OR
          </span>

        </div>


        {/* Google */}

        <button className="google-register">

          Continue with Google

        </button>


        {/* Login */}

        <p className="login-link">

          Already have an account?

          <a href="/login">
            {" "}Login
          </a>

        </p>

      </div>

    </section>

  );
}

export default Register;