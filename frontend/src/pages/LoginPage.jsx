import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const items_center = "flex flex-col items-center";
  const input_style = "border rounded-md p-2 mb-4";

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      identifier,
      password,
    });
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
