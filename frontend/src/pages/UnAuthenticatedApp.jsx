import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";

function UnAuthenticatedApp() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
export default UnAuthenticatedApp;
