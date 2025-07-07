import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";

function AuthenticatedApp() {
  return (
    <div className="AuthenticatedApp">
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
export default AuthenticatedApp;
