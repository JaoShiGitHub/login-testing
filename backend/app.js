import express from "express";
import dotenv from "dotenv";
// Middleware:
import { validate_register } from "./middlewares/validations.js";
// Controllers:
import register from "./controllers/register.js";
import get_user from "./controllers/users.js";
import auth from "./controllers/auth.js";

const app = express();
const port = 4000;
dotenv.config();

app.use(express.json());

app.post("/register", [validate_register], register);
app.post("/login", auth);
app.get("/profile", get_user);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
