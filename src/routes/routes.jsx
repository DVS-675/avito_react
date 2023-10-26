import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AdvPage from "../pages/AdvPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/advertisement" element={<AdvPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default AppRoutes;
