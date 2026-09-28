import { useNavigate, Outlet } from "react-router";
import {
  Close,
  CloudSync,
  MenuBook,
  Devices,
  NotificationsActive,
  AccountTree,
  Analytics,
  AdminPanelSettings,
  SwapHoriz,
} from "@mui/icons-material";

import "./onlinefeature.css";

const OnlineFeature = () => {
  const features = [
    {
      icon: <CloudSync />,
      title: "Real-time Cloud Data Sync",
      description:
        "Instantaneous synchronization across all locations and devices.",
    },
    {
      icon: <MenuBook />,
      title: "Recipe/BOM Management",
      description:
        "Precise tracking of ingredients and build materials per unit.",
    },
    {
      icon: <Devices />,
      title: "Cross-Device & Mobile Access",
      description:
        "Manage your business from anywhere, on any device securely.",
    },
    {
      icon: <NotificationsActive />,
      title: "Batch & Expiry Date Alerts",
      description:
        "Automated notifications to prevent spoilage and ensure FIFO.",
    },
    {
      icon: <AccountTree />,
      title: "Multi-Branch Management",
      description:
        "Centralized control for multiple storefronts or franchise locations.",
    },
    {
      icon: <Analytics />,
      title: "Net Profit & COGS Analytics",
      description:
        "Deep financial insights and real-time cost of goods sold tracking.",
    },
    {
      icon: <AdminPanelSettings />,
      title: "Staff Access Permissions",
      description:
        "Granular role-based access control for security and compliance.",
    },
    {
      icon: <SwapHoriz />,
      title: "Automated Stock Transfers",
      description:
        "Streamlined inventory movement between warehouses and stores.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="online-features-overlay">
      <div className="online-features-modal">
        <div className="online-features-header">
          <div className="online-features-header-left">
            <CloudSync className="online-features-header-icon" />

            <span className="online-features-header-title">
              Online Version Features
            </span>
          </div>

          <button
            type="button"
            className="online-features-close-button"
            onClick={() => navigate(-1)}
          >
            <Close className="online-features-close-icon" />
          </button>
          <Outlet />
        </div>

        <div className="online-features-content">
          <div className="online-features-grid">
            {features.map((feature, index) => (
              <div className="online-feature-item" key={index}>
                <div className="online-feature-check">{feature.icon}</div>

                <div className="online-feature-info">
                  <div className="online-feature-title">{feature.title}</div>

                  <div className="online-feature-description">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineFeature;
