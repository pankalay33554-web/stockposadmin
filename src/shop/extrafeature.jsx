import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./extrafeature.css";
import { useNavigate, Outlet } from "react-router";

const features = [
  {
    title: "Staff Shift & Attendance",
    description:
      "Track employee clock-ins, shift rotas, and automated commission calculations.",
  },
  {
    title: "Advanced Recipe Costing",
    description:
      "Deep margin analysis, ingredient wastage tracking, and live COGS adjustments.",
  },
  {
    title: "Customer Loyalty & CRM",
    description:
      "Manage membership points, reward tiers, and targeted promo codes.",
  },
  {
    title: "Delivery & E-Commerce API",
    description:
      "Direct integration with food delivery platforms and custom online ordering.",
  },
  {
    title: "Automated Marketing Vouchers",
    description:
      "Create and send automated SMS or Viber discount coupons to VIP customers.",
  },
  {
    title: "Sales Forecasting AI",
    description:
      "Automated reorder point predictions based on historical sales trends.",
  },
  {
    title: "Kitchen Display System (KDS)",
    description:
      "Real-time order routing directly to kitchen display screens and bump bars.",
  },
  {
    title: "Multi-Currency & Advanced Tax",
    description:
      "Complex tax structures, dual currency checkout, and financial export logs.",
  },
];

const ExtraFeature = () => {
  const navigate = useNavigate();
  return (
    <div className="extra-features-overlay">
      <div className="extra-features-popup">
        <div className="extra-features-header">
          <div className="extra-features-title-wrapper">
            <AutoAwesomeIcon className="extra-features-title-icon" />

            <div className="extra-features-title">Extra Version Features</div>
          </div>

          <button
            type="button"
            className="extra-features-close-button"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            <CloseIcon className="extra-features-close-icon" />
          </button>
          <Outlet />
        </div>

        <div className="extra-features-content">
          <div className="extra-features-grid">
            {features.map((feature, index) => (
              <div className="extra-feature-item" key={index}>
                <div className="extra-feature-icon-wrapper">
                  <CheckCircleIcon className="extra-feature-check-icon" />
                </div>

                <div className="extra-feature-info">
                  <div className="extra-feature-title">{feature.title}</div>

                  <div className="extra-feature-description">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="extra-features-footer">
          <div className="extra-features-footer-text">
            Features are continuously updated. Consult documentation for
            specific integration details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraFeature;
