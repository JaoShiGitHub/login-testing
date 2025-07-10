import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import LangButtons from "./LangButtons";

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { t } = useTranslation();

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
      <h1 className="font-bold text-4xl mb-10">Mini Profile</h1>
      <form className={`${items_center} gap-y-2`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              className={input_style}
              name="username"
              placeholder={
                t("username").charAt(0).toUpperCase() + t("username").slice(1)
              }
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
              placeholder={
                t("password").charAt(0).toUpperCase() + t("password").slice(1)
              }
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
          <Trans i18nKey="login">Log in</Trans>
        </button>
      </form>

      <p>
        <Trans i18nKey="haveNoAccount">Don't have an account?</Trans>{" "}
        <button
          className="mt-40 mb-4 font-bold text-blue-500"
          onClick={() => navigate("/register")}
        >
          <Trans i18nKey="register">Register</Trans>
        </button>
      </p>
      <LangButtons />
    </div>
  );
}

export default LoginPage;
