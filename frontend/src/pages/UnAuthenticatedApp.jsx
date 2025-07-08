import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NotFoundPage from "./NotFoundPage";

function UnAuthenticatedApp() {
  return (
    <div className="">
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
export default UnAuthenticatedApp;
