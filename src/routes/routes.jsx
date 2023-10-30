import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AdvPage from "../pages/AdvPage";
import SellerPage from "../pages/SellerPage";
import LoginPage from "../pages/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/advertisement" element={<AdvPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/sellerProfile" element={<SellerPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
