import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AdvPage from "../pages/AdvPage";
import SellerPage from "../pages/SellerPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./protected-route";

function AppRoutes({ isAllowed }) {
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/login" isAllowed={isAllowed} />}
      >
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/sellerProfile/:id" element={<SellerPage />} />
      </Route>
      <Route path="/advertisement/:id" element={<AdvPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
