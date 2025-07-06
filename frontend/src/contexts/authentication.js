import axios from "axios";
import jwtDecode from "jwt-decode";

const login = async (data) => {
  const result = await axios.post("http://localhost:4000/login", data, {
    withCredentials: true,
  });
};

export default login;
