import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLang: "en",
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        email: "Email",
        username: "Username",
        status: "Status",
        password: "Password",
        login: "Login",
        logout: "Log out",
        register: "Register",
        usernameOrEmail: "Username or email",
        haveNoAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        loginFormIncorrect: "Username or password is incorrect.",
      },
    },
    esp: {
      translation: {
        welcome: "Bienvenido",
        email: "Correo electrónico",
        username: "Usuario",
        status: "Estado",
        password: "Contraseña",
        login: "Iniciar Sesión",
        logout: "Salir",
        register: "Regístrate",
        usernameOrEmail: "Usuario o correo electrónico",
        haveNoAccount: "¿No tienes una cuenta?",
        haveAccount: "¿Tienes una cuenta?",
        loginFormIncorrect:
          "El nombre de usuario o la contraseña no son correctos.",
      },
    },
  },
});
