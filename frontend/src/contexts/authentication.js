import axios from "axios";
import React, { useState } from "react";
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

      setIsAuthenticated(!isAuthenticated);
      console.log("Login successful: ", response.data);
      navigate("/profile");
    } catch (error) {
      console.log("Login failed: ", error);
    }
  };

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
