import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const items_center = "flex flex-col items-center";
  const input_style = "border rounded-md p-2 mb-4";

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await login({
        identifier,
        password,
      });
    } catch (error) {
      setErrorMessage("Username or password is incorrect.");
    }
  };

  return (
    <div className={`${items_center} justify-center h-screen`}>
      <h1 className="font-bold text-4xl mb-10">Login User</h1>
      <form className={`${items_center} gap-y-2`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              className={input_style}
              name="username"
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              className={input_style}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <button
          className="mt-40 font-bold text-blue-500"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
