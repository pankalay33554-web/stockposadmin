import { Navigate, Routes, Route } from "react-router-dom";

import CreatePOS from "./shop/createshop";
import StockPos from "./stockpos";
import OfflineFeaturesModal from "./shop/offlinefeature";
import ShopDetails from "./shop/viewdetail";

import ShopLogin from "./shop/shoplogin";
import LoginSecurity from "./shop/shoploginsecurity";
import ProtectedRoute from "./shop/protectedRoute";
import OnlineFeature from "./shop/onlinefeature";
import ExtraFeature from "./shop/extrafeature";
import CreateNewUser from "./shop/newuser";

export default function App() {
  return (
    <LoginSecurity>
      <Routes>
        <Route path="/login" element={<ShopLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/shop" element={<StockPos />}>
            <Route path="newuser" element={<CreateNewUser />} />
          </Route>

          <Route path="/createpos" element={<CreatePOS />}>
            <Route path="offlinefeatures" element={<OfflineFeaturesModal />} />
            <Route path="onlinefeatures" element={<OnlineFeature />} />
            <Route path="extrafeatures" element={<ExtraFeature />} />
          </Route>

          <Route path="/shopdetails" element={<ShopDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </LoginSecurity>
  );
}
