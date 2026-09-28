import { useEffect, useMemo, useState } from "react";
import {
  Add,
  Search,
  Person,
  LocationOnOutlined,
  Close,
  Edit,
  Visibility,
  VisibilityOff,
  Lock,
  InfoOutlined,
  Logout,
  StorefrontOutlined,
  CheckCircle,
  Error,
  KeyboardArrowRight,
  SaveOutlined,
  Delete,
} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router";

import "./shop/stockpos.css";

const STORE_MANAGEMENT_SHOPS = [
  {
    id: 1,
    name: "Aung Htoo Pharmacy",
    location: "Yangon, Downtown Branch",
    type: "Offline",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1000&q=85",
    extra: false,
  },
  {
    id: 2,
    name: "The Beast Clothing",
    location: "Yangon, Shopping Mall Branch",
    type: "Online",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85",
    extra: false,
  },
  {
    id: 3,
    name: "Best Wish Burger",
    location: "Mandalay, Main Road",
    type: "Online",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    extra: true,
  },
  {
    id: 4,
    name: "Golden Coffee House",
    location: "Yangon, Bahan Branch",
    type: "Offline",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
    extra: false,
  },
  {
    id: 5,
    name: "Urban Fashion Store",
    location: "Yangon, Junction City",
    type: "Online",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    extra: true,
  },
  {
    id: 6,
    name: "Royal Food Corner",
    location: "Yangon, Hledan Branch",
    type: "Offline",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
    extra: true,
  },
];

const STORE_MANAGEMENT_INITIAL_PROFILE = {
  name: "Hein Min Aung",
  email: "heinmin@gmail.com",
  password: "admin123",
};

function StockPos() {
  const [shops, setShops] = useState(STORE_MANAGEMENT_SHOPS);

  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [deleteShop, setDeleteShop] = useState(null);

  const [profile, setProfile] = useState(STORE_MANAGEMENT_INITIAL_PROFILE);

  const [draftProfile, setDraftProfile] = useState(
    STORE_MANAGEMENT_INITIAL_PROFILE,
  );

  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const [showLogoutPassword, setShowLogoutPassword] = useState(false);

  const [logoutPassword, setLogoutPassword] = useState("");
  const [logoutError, setLogoutError] = useState("");

  const [profileErrors, setProfileErrors] = useState({});
  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  /* API */
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const searchTimer = setTimeout(() => {
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchText]);

  const filteredShops = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return shops.filter((shop) => {
      const typeMatch =
        activeTab === "All" ||
        shop.type.toLowerCase() === activeTab.toLowerCase();
      const searchMatch =
        keyword.length === 0 ||
        shop.name.toLowerCase().includes(keyword) ||
        shop.location.toLowerCase().includes(keyword) ||
        shop.type.toLowerCase().includes(keyword);

      return typeMatch && searchMatch;
    });
  }, [shops, activeTab, searchText]);

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup((previous) => ({
        ...previous,
        show: false,
      }));
    }, 3000);
  };

  const closePopup = () => {
    setPopup((previous) => ({
      ...previous,
      show: false,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchText("");
  };

  const openProfile = () => {
    setDraftProfile({
      ...profile,
    });

    setProfileErrors({});
    setShowProfilePassword(false);
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    setShowProfilePassword(false);
    setProfileErrors({});
  };

  const handleProfileChange = (field, value) => {
    setDraftProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setProfileErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSaveProfile = () => {
    const errors = {};

    if (!draftProfile.name.trim()) {
      errors.name = "Full Name is required.";
    }

    if (!draftProfile.email.trim()) {
      errors.email = "Work Email is required.";
    } else if (!validateEmail(draftProfile.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!draftProfile.password.trim()) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);

      showPopup("error", "Please correct the highlighted fields.");

      return;
    }

    setProfile({
      ...draftProfile,
    });

    setProfileOpen(false);
    setProfileErrors({});
    setShowProfilePassword(false);

    showPopup("success", "Profile changes saved successfully.");
  };

  const openLogoutVerification = () => {
    setLogoutPassword("");
    setLogoutError("");
    setShowLogoutPassword(false);
    setLogoutOpen(true);
  };

  const closeLogoutVerification = () => {
    setLogoutOpen(false);
    setLogoutPassword("");
    setLogoutError("");
    setShowLogoutPassword(false);
  };

  const handleLogoutPasswordChange = (event) => {
    setLogoutPassword(event.target.value);

    if (logoutError) {
      setLogoutError("");
    }
  };

  const handleConfirmLogout = () => {
    if (!logoutPassword.trim()) {
      setLogoutError("Please enter your current admin password.");
      return;
    }

    if (logoutPassword !== profile.password) {
      setLogoutError("Incorrect password. You cannot logout.");
      return;
    }

    setLogoutError("");

    showPopup("success", "Password verified. Logging out...");

    localStorage.removeItem("isLoggedIn");

    setTimeout(() => {
      window.location.href = "/login";
    }, 900);
  };

  const handleLogoutKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConfirmLogout();
    }
  };

  const handleCloseDelete = () => {
    setDeleteShop(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteShop) {
      return;
    }

    setShops((previous) =>
      previous.filter((shop) => shop.id !== deleteShop.id),
    );

    showPopup("success", `${deleteShop.name} has been removed successfully.`);

    setDeleteShop(null);
  };

  return (
    <div className="storeManagementPage">
      <header className="storeManagementTopBar">
        <div className="storeManagementBrand">
          <div className="storeManagementBrandTitle">
            Store Management Portal
          </div>
        </div>

        <div className="storeManagementTopActions">
          <button
            className="storeManagementCreateUserButton"
            onClick={() => navigate("newuser")}
          >
            <Add className="storeManagementButtonIcon" />

            <span className="storeManagementButtonText">Create New User</span>
          </button>
          <Outlet />

          <button
            className="storeManagementManagerButton"
            onClick={openProfile}
          >
            <span className="storeManagementManagerAvatar">
              <Person />
            </span>

            <span className="storeManagementManagerInfo">
              <span className="storeManagementManagerRole">System Manager</span>

              <span className="storeManagementManagerName">{profile.name}</span>
            </span>
          </button>
        </div>
      </header>

      <main className="storeManagementContent">
        <section className="storeManagementHeadingRow">
          <div className="storeManagementHeadingBlock">
            <h1 className="storeManagementPageTitle">Registered Shops List</h1>

            <p className="storeManagementPageSubtitle">
              View and manage all registered POS shops
            </p>
          </div>

          <button
            className="storeManagementCreatePosButton"
            onClick={() => navigate("/createpos")}
          >
            <Add />

            <span>Create New POS</span>
          </button>
          <Outlet />
        </section>

        <section className="storeManagementToolbar">
          <div className="storeManagementTabs">
            <button
              className={`storeManagementTab ${
                activeTab === "All" ? "storeManagementTabActive" : ""
              }`}
              onClick={() => handleTabChange("All")}
            >
              <StorefrontOutlined />

              <span>All Shops</span>
            </button>

            <button
              className={`storeManagementTab ${
                activeTab === "Offline" ? "storeManagementTabActive" : ""
              }`}
              onClick={() => handleTabChange("Offline")}
            >
              <span>Offline</span>
            </button>

            <button
              className={`storeManagementTab ${
                activeTab === "Online" ? "storeManagementTabActive" : ""
              }`}
              onClick={() => handleTabChange("Online")}
            >
              <span>Online</span>
            </button>
          </div>

          <div className="storeManagementSearchBox">
            <Search className="storeManagementSearchIcon" />

            <input
              className="storeManagementSearchInput"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search merchants..."
            />

            {isSearching && (
              <span className="storeManagementSearchLoader">
                <span className="storeManagementSpinner" />
              </span>
            )}

            {searchText && !isSearching && (
              <button
                className="storeManagementSearchClear"
                onClick={clearSearch}
              >
                <Close />
              </button>
            )}
          </div>
        </section>

        {isLoading ? (
          <div className="storeManagementSkeletonGrid">
            {[1, 2, 3].map((item) => (
              <div className="storeManagementSkeletonCard" key={item}>
                <div className="storeManagementSkeletonImage">
                  <div className="storeManagementSkeletonShimmer" />
                </div>

                <div className="storeManagementSkeletonBody">
                  <div className="storeManagementSkeletonLine storeManagementSkeletonLineTitle">
                    <div className="storeManagementSkeletonShimmer" />
                  </div>

                  <div className="storeManagementSkeletonLine storeManagementSkeletonLineLocation">
                    <div className="storeManagementSkeletonShimmer" />
                  </div>

                  <div className="storeManagementSkeletonTag">
                    <div className="storeManagementSkeletonShimmer" />
                  </div>

                  <div className="storeManagementSkeletonButton">
                    <div className="storeManagementSkeletonShimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="storeManagementShopGrid">
            {filteredShops.map((shop, index) => (
              <article
                className="storeManagementShopCard"
                key={shop.id}
                style={{
                  animationDelay: `${index * 90}ms`,
                }}
              >
                <div className="storeManagementShopImageWrapper">
                  <img
                    className="storeManagementShopImage"
                    src={shop.image}
                    alt={shop.name}
                  />

                  <div
                    className={`storeManagementShopStatus ${
                      shop.type === "Online"
                        ? "storeManagementShopStatusOnline"
                        : "storeManagementShopStatusOffline"
                    }`}
                  >
                    <span className="storeManagementStatusDot" />

                    <span>{shop.type} Version</span>
                  </div>
                </div>

                <div className="storeManagementShopBody">
                  <h2 className="storeManagementShopName">{shop.name}</h2>

                  <div className="storeManagementShopLocation">
                    <LocationOnOutlined />

                    <span>{shop.location}</span>
                  </div>

                  <div className="storeManagementShopTags">
                    <span
                      className={`storeManagementVersionTag ${
                        shop.type === "Online"
                          ? "storeManagementVersionOnline"
                          : "storeManagementVersionOffline"
                      }`}
                    >
                      {shop.type} Version
                    </span>

                    {shop.extra && (
                      <span className="storeManagementExtraTag">
                        Extra Features
                      </span>
                    )}
                  </div>

                  <button
                    className="storeManagementViewButton"
                    onClick={() => navigate("/shopdetails")}
                  >
                    <span>View Details</span>

                    <KeyboardArrowRight />
                  </button>
                  <Outlet />
                </div>
              </article>
            ))}

            {filteredShops.length === 0 && (
              <div className="storeManagementEmptyState">
                <div className="storeManagementEmptyIcon">
                  <Search />
                </div>

                <div className="storeManagementEmptyTitle">No shops found</div>

                <div className="storeManagementEmptyText">
                  Try another merchant name or change the shop filter.
                </div>

                <button
                  className="storeManagementEmptyResetButton"
                  onClick={() => {
                    setSearchText("");
                    setActiveTab("All");
                  }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {profileOpen && (
        <div className="storeManagementOverlay">
          <div className="storeManagementOverlayClose" onClick={closeProfile} />

          <aside className="storeManagementProfileDrawer">
            <div className="storeManagementDrawerHeader">
              <div className="storeManagementDrawerTitle">
                Manager Profile Settings
              </div>

              <button
                className="storeManagementDrawerClose"
                onClick={closeProfile}
              >
                <Close />
              </button>
            </div>

            <div className="storeManagementDrawerContent">
              <div className="storeManagementProfileHero">
                <div className="storeManagementProfileAvatar">
                  <Person />
                </div>

                <div className="storeManagementProfileName">
                  {draftProfile.name}
                </div>

                <div className="storeManagementRoleBadge">System Manager</div>
              </div>

              <div className="storeManagementProfileForm">
                <div className="storeManagementField">
                  <label className="storeManagementFieldLabel">Full Name</label>

                  <div
                    className={`storeManagementInputWrapper ${
                      profileErrors.name ? "storeManagementInputError" : ""
                    }`}
                  >
                    <input
                      className="storeManagementProfileInput"
                      value={draftProfile.name}
                      onChange={(event) =>
                        handleProfileChange("name", event.target.value)
                      }
                    />

                    <Edit className="storeManagementInputIcon" />
                  </div>

                  {profileErrors.name && (
                    <div className="storeManagementFieldError">
                      <Error />
                      <span>{profileErrors.name}</span>
                    </div>
                  )}
                </div>

                <div className="storeManagementField">
                  <label className="storeManagementFieldLabel">
                    Work Email
                  </label>

                  <div
                    className={`storeManagementInputWrapper ${
                      profileErrors.email ? "storeManagementInputError" : ""
                    }`}
                  >
                    <input
                      className="storeManagementProfileInput"
                      value={draftProfile.email}
                      onChange={(event) =>
                        handleProfileChange("email", event.target.value)
                      }
                    />

                    <Edit className="storeManagementInputIcon" />
                  </div>

                  {profileErrors.email && (
                    <div className="storeManagementFieldError">
                      <Error />
                      <span>{profileErrors.email}</span>
                    </div>
                  )}
                </div>

                <div className="storeManagementField">
                  <label className="storeManagementFieldLabel">Password</label>
                  <div
                    className={`storeManagementInputWrapper ${
                      profileErrors.password ? "storeManagementInputError" : ""
                    }`}
                  >
                    <input
                      className="storeManagementProfileInput storeManagementPasswordInput"
                      type={showProfilePassword ? "text" : "password"}
                      value={draftProfile.password}
                      onChange={(event) =>
                        handleProfileChange("password", event.target.value)
                      }
                    />

                    <div className="storeManagementPasswordActions">
                      <button
                        className="storeManagementFieldIconButton"
                        onClick={() =>
                          setShowProfilePassword((previous) => !previous)
                        }
                      >
                        {showProfilePassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </button>

                      <Edit className="storeManagementInputIcon" />
                    </div>
                  </div>

                  {profileErrors.password && (
                    <div className="storeManagementFieldError">
                      <Error />
                      <span>{profileErrors.password}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="storeManagementDrawerFooter">
              <button
                className="storeManagementSaveButton"
                onClick={handleSaveProfile}
              >
                <SaveOutlined />

                <span>Save Profile Changes</span>
              </button>

              <button
                className="storeManagementLogoutButton"
                onClick={openLogoutVerification}
              >
                <Logout />

                <span>Log Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {deleteShop && (
        <div className="storeManagementModalOverlay">
          <div className="storeManagementDeleteModal">
            <div className="storeManagementDeleteIcon">
              <Delete />
            </div>

            <div className="storeManagementDeleteTitle">Delete Shop?</div>

            <div className="storeManagementDeleteText">
              Are you sure you want to delete
              <strong> {deleteShop.name}</strong>?
              <span>This action cannot be undone.</span>
            </div>

            <div className="storeManagementDeleteActions">
              <button
                className="storeManagementCancelButton"
                onClick={handleCloseDelete}
              >
                Cancel
              </button>

              <button
                className="storeManagementDeleteConfirmButton"
                onClick={handleConfirmDelete}
              >
                <Delete />

                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {logoutOpen && (
        <div className="storeManagementModalOverlay">
          <div className="storeManagementSecurityModal">
            <div className="storeManagementSecurityIcon">
              <Lock />
            </div>
            <div className="storeManagementSecurityTitle">
              Security Verification
            </div>

            <div className="storeManagementSecuritySubtitle">
              To proceed with this action, please re-enter your current account
              password for security authorization.
            </div>

            <div className="storeManagementInfoBox">
              <InfoOutlined />

              <span>
                This action requires administrative confirmation to protect
                store configurations.
              </span>
            </div>

            <div className="storeManagementSecurityField">
              <label className="storeManagementFieldLabel">
                Current Admin Password
              </label>

              <div
                className={`storeManagementSecurityInputWrapper ${
                  logoutError ? "storeManagementSecurityInputError" : ""
                }`}
              >
                <Lock className="storeManagementSecurityInputIcon" />

                <input
                  className="storeManagementSecurityInput"
                  type={showLogoutPassword ? "text" : "password"}
                  value={logoutPassword}
                  onChange={handleLogoutPasswordChange}
                  onKeyDown={handleLogoutKeyDown}
                  placeholder="Enter your password"
                  autoFocus
                />

                <button
                  className="storeManagementSecurityEyeButton"
                  onClick={() => setShowLogoutPassword((previous) => !previous)}
                >
                  {showLogoutPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>

              {logoutError && (
                <div className="storeManagementValidationError">
                  <Error />

                  <span>{logoutError}</span>
                </div>
              )}
            </div>

            <div className="storeManagementSecurityActions">
              <button
                className="storeManagementCancelButton"
                onClick={closeLogoutVerification}
              >
                Cancel
              </button>

              <button
                className="storeManagementConfirmButton"
                onClick={handleConfirmLogout}
              >
                <span>Confirm &amp; Proceed</span>

                <KeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div
          className={`storeManagementToast ${
            popup.type === "error"
              ? "storeManagementToastError"
              : "storeManagementToastSuccess"
          }`}
        >
          <div className="storeManagementToastIcon">
            {popup.type === "error" ? <Error /> : <CheckCircle />}
          </div>

          <div className="storeManagementToastContent">
            <div className="storeManagementToastTitle">
              {popup.type === "error" ? "Error" : "Success"}
            </div>

            <div className="storeManagementToastMessage">{popup.message}</div>
          </div>

          <button className="storeManagementToastClose" onClick={closePopup}>
            <Close />
          </button>
        </div>
      )}
    </div>
  );
}
export default StockPos;
