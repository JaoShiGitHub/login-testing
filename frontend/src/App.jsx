import { useAuth } from "./contexts/authentication.js";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import UnAuthenticatedApp from "./pages/UnAuthenticatedApp.jsx";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
