import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default AppRoutes;
