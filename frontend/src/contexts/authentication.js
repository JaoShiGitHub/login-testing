import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      await axios.get(`http://localhost:4000/profile?customer_id=${user.id}`, {
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

      setUser(response.data);
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Login successful: ", user);
    }
  }, [user]);

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
      navigate(`/login`);
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
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
