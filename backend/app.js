import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Middleware:
import { validate_register } from "./middlewares/validations.js";
import authMiddleware from "./middlewares/auth.js";
// Controllers:
import register from "./controllers/register.js";
import get_user from "./controllers/users.js";
import auth from "./controllers/auth.js";
import logout from "./controllers/logout.js";

const app = express();
const port = 4000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.post("/register", [validate_register], register);
app.post("/login", auth);
app.get("/profile", authMiddleware, get_user);
app.post("/logout", logout);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
