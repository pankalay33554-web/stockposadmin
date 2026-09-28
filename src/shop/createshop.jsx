import { useState } from "react";
import { useNavigate, Outlet } from "react-router";

import {
  ArrowBack,
  Person,
  StorefrontOutlined,
  CameraAltOutlined,
  CheckCircle,
  RadioButtonUnchecked,
  InfoOutlined,
  KeyboardArrowDown,
  Close,
  Error,
  WarningAmberOutlined,
  ArrowForward,
  Inventory2Outlined,
} from "@mui/icons-material";

import "./createpos.css";

const categories = [
  "Bakery",
  "Restaurant",
  "Cafe",
  "Fashion",
  "Grocery",
  "Electronics",
  "Beauty",
  "Other",
];

const tiers = {
  offline: {
    name: "Offline",
    price: 0,
    description:
      "Essential tools for back-office management, inventory tracking, and standard reporting.",
  },
  online: {
    name: "Online",
    price: 20,
    description:
      "Full digital storefront synchronization, remote order management, and web dashboard access.",
  },
  extra: {
    name: "Extra",
    price: 15,
    description:
      "Advanced AI analytics, multi-location support, and priority 24/7 technical assistance.",
  },
};

const CreatePOS = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    shopAddress: "",
    contactNumber: "",
    category: "",
    tier: "offline",
    extra: false,
    logo: null,
  });

  const [preview, setPreview] = useState("");

  const [errors, setErrors] = useState({});

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "success",
      title: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleTierChange = (tier) => {
    setFormData((prev) => ({
      ...prev,
      tier,
      extra: tier === "online" ? prev.extra : false,
    }));

    setErrors((prev) => ({
      ...prev,
      tier: "",
    }));
  };

  const handleExtraChange = () => {
    if (formData.tier !== "online") return;

    setFormData((prev) => ({
      ...prev,
      extra: !prev.extra,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      showPopup("error", "Invalid Image", "Please upload a PNG or JPG image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showPopup(
        "error",
        "Image Too Large",
        "Logo image must be smaller than 5MB.",
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setErrors((prev) => ({
      ...prev,
      logo: "",
    }));

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please select or enter client name.";
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required.";
    } else if (formData.shopName.trim().length < 2) {
      newErrors.shopName = "Shop name must be at least 2 characters.";
    }

    if (!formData.shopAddress.trim()) {
      newErrors.shopAddress = "Shop address is required.";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^[+]?[\d\s()-]{7,20}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = "Please enter a valid contact number.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a business category.";
    }
    if (!formData.tier) {
      newErrors.tier = "Please select a POS tier.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    let total = tiers[formData.tier]?.price || 0;

    if (formData.tier === "online" && formData.extra) {
      total += tiers.extra.price;
    }

    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) {
      showPopup(
        "error",
        "Incomplete Information",
        "Please check the highlighted fields and complete all required information.",
      );
      return;
    }

    showPopup(
      "success",
      "POS Account Created",
      `${formData.shopName} has been successfully registered as a ${formData.tier} POS account.`,
    );
  };

  const handleCancel = () => {
    showPopup(
      "warning",
      "Cancel Registration?",
      "Your entered information will not be saved. Are you sure you want to cancel?",
    );
  };

  const handlePopupAction = () => {
    if (popup.type === "warning") {
      closePopup();

      setFormData({
        fullName: "",
        shopName: "",
        shopAddress: "",
        contactNumber: "",
        category: "",
        tier: "offline",
        extra: false,
        logo: null,
      });

      setPreview("");
      setErrors({});
    } else {
      closePopup();
    }
  };

  return (
    <div className="create-pos-page">
      <div className="create-pos-topbar">
        <button
          type="button"
          className="create-pos-back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </button>

        <span className="create-pos-top-title">Create New POS</span>
      </div>

      <main className="create-pos-container">
        <div className="create-pos-heading">
          <h1 className="create-pos-main-title">Register New Shop</h1>

          <p className="create-pos-subtitle">
            Enter shop details to set up a new point-of-sale system.
          </p>
        </div>

        <form className="create-pos-card" onSubmit={handleSubmit} noValidate>
          <section className="create-pos-section">
            <div className="create-pos-section-title">
              <Person className="create-pos-section-icon" />

              <span>Client &amp; Account Information</span>
            </div>

            <div className="create-pos-field">
              <label className="create-pos-label">Full Name</label>

              <div
                className={`create-pos-select-wrapper ${
                  errors.fullName ? "create-pos-input-error" : ""
                }`}
              >
                <input
                  className="create-pos-input"
                  type="text"
                  name="fullName"
                  placeholder="Enter client name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <KeyboardArrowDown className="create-pos-select-icon" />
              </div>

              {errors.fullName && (
                <span className="create-pos-error-text">{errors.fullName}</span>
              )}
            </div>
          </section>

          <section className="create-pos-section">
            <div className="create-pos-section-title">
              <StorefrontOutlined className="create-pos-section-icon" />

              <span>Shop &amp; Business Details</span>
            </div>

            <div className="create-pos-business-grid">
              <div className="create-pos-business-fields">
                <div className="create-pos-field">
                  <label className="create-pos-label">Shop Name</label>
                  <input
                    className={`create-pos-input ${
                      errors.shopName ? "create-pos-input-error" : ""
                    }`}
                    type="text"
                    name="shopName"
                    placeholder="The Artisan Bakery"
                    value={formData.shopName}
                    onChange={handleChange}
                  />

                  {errors.shopName && (
                    <span className="create-pos-error-text">
                      {errors.shopName}
                    </span>
                  )}
                </div>

                <div className="create-pos-field">
                  <label className="create-pos-label">Shop Address</label>

                  <input
                    className={`create-pos-input ${
                      errors.shopAddress ? "create-pos-input-error" : ""
                    }`}
                    type="text"
                    name="shopAddress"
                    placeholder="123 Commerce Blvd, Suite 100"
                    value={formData.shopAddress}
                    onChange={handleChange}
                  />

                  {errors.shopAddress && (
                    <span className="create-pos-error-text">
                      {errors.shopAddress}
                    </span>
                  )}
                </div>

                <div className="create-pos-two-column">
                  <div className="create-pos-field">
                    <label className="create-pos-label">
                      Shop Contact Number
                    </label>

                    <input
                      className={`create-pos-input ${
                        errors.contactNumber ? "create-pos-input-error" : ""
                      }`}
                      type="tel"
                      name="contactNumber"
                      placeholder="(555) 123-4567"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />

                    {errors.contactNumber && (
                      <span className="create-pos-error-text">
                        {errors.contactNumber}
                      </span>
                    )}
                  </div>

                  <div className="create-pos-field">
                    <label className="create-pos-label">
                      Business Category
                    </label>

                    <div
                      className={`create-pos-select-wrapper ${
                        errors.category ? "create-pos-input-error" : ""
                      }`}
                    >
                      <select
                        className="create-pos-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDown className="create-pos-select-icon" />
                    </div>
                    {errors.category && (
                      <span className="create-pos-error-text">
                        {errors.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="create-pos-logo-area">
                <label className="create-pos-label">Shop Logo/Photo</label>

                <label
                  className={`create-pos-upload-box ${
                    preview ? "create-pos-upload-preview" : ""
                  } ${errors.logo ? "create-pos-input-error" : ""}`}
                >
                  <input
                    className="create-pos-file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleLogoUpload}
                  />

                  {preview ? (
                    <div className="create-pos-preview-wrapper">
                      <img
                        className="create-pos-preview-image"
                        src={preview}
                        alt="Shop logo preview"
                      />

                      <div className="create-pos-preview-overlay">
                        <CameraAltOutlined />
                        <span>Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="create-pos-upload-content">
                      <div className="create-pos-upload-icon">
                        <CameraAltOutlined />
                      </div>

                      <span className="create-pos-upload-title">
                        Upload Logo/Photo
                      </span>

                      <span className="create-pos-upload-info">
                        PNG, JPG up to 5MB
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </section>

          <section className="create-pos-section create-pos-tier-section">
            <div className="create-pos-section-title">
              <Inventory2Outlined className="create-pos-section-icon" />

              <span>Select POS Tier &amp; Add-ons</span>
            </div>

            <div className="create-pos-tier-grid">
              <div
                className={`create-pos-tier-card create-pos-tier-offline ${
                  formData.tier === "offline" ? "create-pos-tier-active" : ""
                }`}
                onClick={() => handleTierChange("offline")}
              >
                <div className="create-pos-tier-header">
                  <div className="create-pos-tier-name">
                    {formData.tier === "offline" ? (
                      <CheckCircle className="create-pos-tier-check" />
                    ) : (
                      <RadioButtonUnchecked className="create-pos-tier-radio" />
                    )}

                    <span>Offline</span>
                  </div>

                  <button
                    type="button"
                    className="create-pos-info-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("offlinefeatures");
                    }}
                  >
                    <InfoOutlined />
                  </button>
                  <Outlet />
                </div>

                <p className="create-pos-tier-description">
                  {tiers.offline.description}
                </p>

                <div className="create-pos-price">
                  <span>$0</span>
                  <small>/mo</small>
                </div>
              </div>

              <div
                className={`create-pos-tier-card create-pos-tier-online ${
                  formData.tier === "online" ? "create-pos-tier-active" : ""
                }`}
                onClick={() => handleTierChange("online")}
              >
                <div className="create-pos-tier-header">
                  <div className="create-pos-tier-name">
                    {formData.tier === "online" ? (
                      <CheckCircle className="create-pos-tier-check create-pos-online-check" />
                    ) : (
                      <RadioButtonUnchecked className="create-pos-tier-radio" />
                    )}

                    <span>Online</span>
                  </div>

                  <button
                    type="button"
                    className="create-pos-info-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("onlinefeatures");
                    }}
                  >
                    <InfoOutlined />
                  </button>
                  <Outlet />
                </div>

                <p className="create-pos-tier-description">
                  {tiers.online.description}
                </p>

                <div className="create-pos-price">
                  <span>$20</span>
                  <small>/mo</small>
                </div>
              </div>

              <div
                className={`create-pos-tier-card create-pos-tier-extra ${
                  formData.extra ? "create-pos-tier-extra-active" : ""
                } ${
                  formData.tier !== "online" ? "create-pos-tier-disabled" : ""
                }`}
                onClick={handleExtraChange}
              >
                <div className="create-pos-tier-header">
                  <div className="create-pos-tier-name">
                    {formData.extra ? (
                      <CheckCircle className="create-pos-tier-check create-pos-extra-check" />
                    ) : (
                      <RadioButtonUnchecked className="create-pos-tier-radio" />
                    )}

                    <span>Extra</span>
                  </div>

                  <button
                    type="button"
                    className="create-pos-info-button"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate("extrafeatures");
                    }}
                  >
                    <InfoOutlined />
                    <Outlet />
                  </button>
                </div>

                <p className="create-pos-tier-description">
                  {tiers.extra.description}
                </p>

                <div className="create-pos-price">
                  <span>$15</span>
                  <small>/mo per device</small>
                </div>

                {formData.tier !== "online" && (
                  <div className="create-pos-disabled-label">
                    Available with Online
                  </div>
                )}
              </div>
            </div>

            {errors.tier && (
              <span className="create-pos-error-text create-pos-tier-error">
                {errors.tier}
              </span>
            )}
          </section>

          <div className="create-pos-summary">
            <div className="create-pos-total">
              <span className="create-pos-total-label">
                TOTAL MONTHLY AMOUNT
              </span>

              <div className="create-pos-total-price">
                <span>${calculateTotal()}</span>

                <small>USD / month</small>
              </div>
            </div>
            <div className="create-pos-actions">
              <button
                type="button"
                className="create-pos-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button type="submit" className="create-pos-submit-button">
                <span>Create POS Account</span>
                <ArrowForward />
              </button>
            </div>
          </div>
        </form>
      </main>

      {popup.show && (
        <div className="create-pos-popup-backdrop">
          <div className="create-pos-popup">
            <button
              type="button"
              className="create-pos-popup-close"
              onClick={closePopup}
            >
              <Close />
            </button>

            <div
              className={`create-pos-popup-icon create-pos-popup-${popup.type}`}
            >
              {popup.type === "success" && <CheckCircle />}

              {popup.type === "error" && <Error />}

              {popup.type === "warning" && <WarningAmberOutlined />}
            </div>

            <h3 className="create-pos-popup-title">{popup.title}</h3>

            <p className="create-pos-popup-message">{popup.message}</p>

            <div className="create-pos-popup-actions">
              {popup.type === "warning" ? (
                <>
                  <button
                    type="button"
                    className="create-pos-popup-cancel"
                    onClick={closePopup}
                  >
                    Keep Editing
                  </button>

                  <button
                    type="button"
                    className="create-pos-popup-confirm"
                    onClick={handlePopupAction}
                  >
                    Yes, Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="create-pos-popup-confirm"
                  onClick={handlePopupAction}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePOS;
