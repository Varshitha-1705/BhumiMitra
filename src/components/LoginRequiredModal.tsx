import { useNavigate } from "react-router-dom";
import { X, Lock } from "lucide-react";

interface LoginRequiredModalProps {
  onClose: () => void;
}

function LoginRequiredModal({
  onClose,
}: LoginRequiredModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <div
      className="login-modal-overlay"
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          className="login-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="login-modal-icon">
          <Lock size={30} />
        </div>

        {/* Title */}
        <h2>
          Login Required
        </h2>

        {/* Description */}
        <p>
          Please login or create an account
          to access this service.
        </p>

        {/* Buttons */}
        <div className="login-modal-actions">

          <button
            className="login-modal-login"
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            className="login-modal-register"
            onClick={handleRegister}
          >
            Register
          </button>

        </div>

      </div>
    </div>
  );
}

export default LoginRequiredModal;