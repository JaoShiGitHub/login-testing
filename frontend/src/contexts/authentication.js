import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await axios.get("http://localhost:4000/profile?customer_id=3", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // This check prevent refreshing from browser

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    try {
      setIsAuthenticated(false);
      const response = await axios.post("http://localhost:4000/login", data, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      console.log("Login successful: ", response.data);
      navigate("/profile");
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      navigator(`/login`);
      await checkAuth();
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        checkAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
