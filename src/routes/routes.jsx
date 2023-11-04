import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AdvPage from "../pages/AdvPage";
import SellerPage from "../pages/SellerPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./protected-route";

function AppRoutes({ isAllowed }) {
  console.log(isAllowed);
  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectPath="/login" isAllowed={isAllowed} />}
      >
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/advertisement" element={<AdvPage />} />
        <Route path="/sellerProfile" element={<SellerPage />} />
      </Route>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
