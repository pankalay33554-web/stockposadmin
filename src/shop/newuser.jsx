import { useState } from "react";
import { useNavigate, Outlet } from "react-router";
import {
  Close,
  Person,
  Visibility,
  VisibilityOff,
  PhoneOutlined,
  EmailOutlined,
  Lock,
  CheckCircle,
  Error,
} from "@mui/icons-material";

import "./newuser.css";

const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      showPopup(
        "error",
        "Please check the form and correct the highlighted fields.",
      );
      return;
    }

    showPopup("success", "New user has been created successfully.");

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      password: "",
    });

    setErrors({});
  };

  return (
    <div className="create-user-overlay">
      <div className="create-user-modal">
        <div className="create-user-header">
          <div className="create-user-header-title">Create New User</div>

          <button
            type="button"
            className="create-user-close-button"
            onClick={() => navigate(-1)}
          >
            <Close className="create-user-close-icon" />
          </button>
          <Outlet />
        </div>

        <div className="create-user-content">
          <div className="create-user-section-title">
            <Person className="create-user-section-icon" />
            <span className="create-user-section-text">
              Client & Account Information
            </span>
          </div>

          <form className="create-user-form" onSubmit={handleSubmit}>
            <div className="create-user-field">
              <label className="create-user-label">Full Name</label>

              <div
                className={`create-user-input-wrapper ${
                  errors.fullName ? "create-user-input-error" : ""
                }`}
              >
                <input
                  className="create-user-input"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              {errors.fullName && (
                <div className="create-user-field-error">
                  <Error className="create-user-error-icon" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            <div className="create-user-field">
              <label className="create-user-label">Phone Number</label>

              <div
                className={`create-user-input-wrapper ${
                  errors.phone ? "create-user-input-error" : ""
                }`}
              >
                <PhoneOutlined className="create-user-input-icon" />

                <input
                  className="create-user-input create-user-input-with-icon"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {errors.phone && (
                <div className="create-user-field-error">
                  <Error className="create-user-error-icon" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            <div className="create-user-field">
              <label className="create-user-label">Login Email Address</label>

              <div
                className={`create-user-input-wrapper ${
                  errors.email ? "create-user-input-error" : ""
                }`}
              >
                <EmailOutlined className="create-user-input-icon" />

                <input
                  className="create-user-input create-user-input-with-icon"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@business.com"
                />
              </div>

              {errors.email && (
                <div className="create-user-field-error">
                  <Error className="create-user-error-icon" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="create-user-field">
              <label className="create-user-label">Password</label>

              <div
                className={`create-user-input-wrapper ${
                  errors.password ? "create-user-input-error" : ""
                }`}
              >
                <Lock className="create-user-input-icon" />

                <input
                  className="create-user-input create-user-input-with-icon create-user-password-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="create-user-password-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOff className="create-user-eye-icon" />
                  ) : (
                    <Visibility className="create-user-eye-icon" />
                  )}
                </button>
              </div>

              {errors.password && (
                <div className="create-user-field-error">
                  <Error className="create-user-error-icon" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="create-user-footer">
              <button
                type="button"
                className="create-user-cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <Outlet />

              <button type="submit" className="create-user-submit-button">
                <Person className="create-user-submit-icon" />
                <span>Create New User</span>
              </button>
            </div>
          </form>
        </div>

        {popup.show && (
          <div
            className={`create-user-message-popup ${
              popup.type === "success"
                ? "create-user-message-success"
                : "create-user-message-error"
            }`}
          >
            <div className="create-user-message-icon-wrapper">
              {popup.type === "success" ? (
                <CheckCircle className="create-user-message-icon" />
              ) : (
                <Error className="create-user-message-icon" />
              )}
            </div>

            <div className="create-user-message-content">
              <div className="create-user-message-title">
                {popup.type === "success" ? "Success" : "Validation Error"}
              </div>

              <div className="create-user-message-text">{popup.message}</div>
            </div>

            <button
              type="button"
              className="create-user-message-close"
              onClick={() =>
                setPopup((prev) => ({
                  ...prev,
                  show: false,
                }))
              }
            >
              <Close className="create-user-message-close-icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewUser;
