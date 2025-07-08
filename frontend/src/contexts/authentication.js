import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // This check prevent refreshing from browser
  useEffect(() => {
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
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
