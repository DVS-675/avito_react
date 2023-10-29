import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AdvPage from "../pages/AdvPage";
import SellerPage from "../pages/SellerPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/advertisement" element={<AdvPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/SellerProfile" element={<SellerPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default AppRoutes;
