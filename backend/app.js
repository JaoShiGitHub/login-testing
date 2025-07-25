import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// Middleware:
import { validate_register } from "./middlewares/validations.js";
import authMiddleware from "./middlewares/auth.js";
// Controllers:
import register from "./controllers/register.js";
import get_user from "./controllers/users.js";
import auth from "./controllers/auth.js";
import logout from "./controllers/logout.js";
import edit_profile from "./controllers/edit_profile.js";
import delete_account from "./controllers/delete_account.js";

const app = express();
const port = 4000;
dotenv.config();

app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.post("/register", [validate_register], register);
app.post("/login", auth);
app.get("/profile", authMiddleware, get_user);
app.post("/logout", logout);
app.put("/edit", authMiddleware, edit_profile);
app.delete("/delete", delete_account);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
