import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangButtons from "./LangButtons";

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
  const [registerStatus, setRegisterStatus] = useState(false);

  const { t } = useTranslation();

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
      setRegisterStatus(!registerStatus);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className={`${items_center} h-screen justify-center`}>
      {registerStatus ? (
        <div>
          <h1 className="font-md text-3xl mb-4">Registration successful</h1>
          <p className="text-lg">
            Go back to{"  "}
            <button
              className="text-blue-500 font-bold ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      ) : (
        <div className={`${items_center}`}>
          <h1 className="font-bold text-4xl mb-10">{t("register")}</h1>
          <form className={items_center} onSubmit={handleRegisterSubmit}>
            <FormLabel
              name="username"
              value={username}
              type="text"
              placeholder={t("username")}
              handleOnChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel
              name="email"
              value={email}
              type="email"
              placeholder={t("email")}
              handleOnChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              name="password"
              value={password}
              type="password"
              placeholder={t("password")}
              handleOnChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel
              name="status"
              value={status}
              type="text"
              placeholder={t("status")}
              handleOnChange={(e) => setStatus(e.target.value)}
            />

            <button className="mt-6 mb-20 bg-blue-500 text-white p-2 rounded">
              {t("register")}
            </button>
          </form>

          <p>
            {t("haveAccount")}{" "}
            <button
              className="mb-4 font-bold text-blue-500"
              onClick={() => navigate("/login")}
            >
              {t("login")}
            </button>
          </p>
          <LangButtons />
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
