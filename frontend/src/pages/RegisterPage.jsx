import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLabel = (props) => {
  const { name, value, type, placeholder, handleOnChange } = props;
  return (
    <label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        className="border rounded-md p-2 mb-4"
      />
    </label>
  );
};

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const items_center = "flex flex-col items-center";

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password,
        status,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className={`${items_center} h-screen justify-center`}>
      <h1 className="font-bold text-4xl mb-10">Register</h1>
      <form className={items_center} onSubmit={handleRegisterSubmit}>
        <FormLabel
          name="username"
          value={username}
          type="text"
          placeholder="Username"
          handleOnChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          handleOnChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          handleOnChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel
          name="status"
          value={status}
          type="text"
          placeholder="Status"
          handleOnChange={(e) => setStatus(e.target.value)}
        />

        <button className="mt-20 bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
