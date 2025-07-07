import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./contexts/authentication.js";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isAuthenticated ? <Profile /> : <LoginPage />}
    </div>
  );
}

export default App;
