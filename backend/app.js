import express from "express";
import register from "./controllers/register.js";
import { validate_register } from "./apps/validations.js";
import get_user from "./controllers/users.js";
const app = express();
const port = 4000;

app.use(express.json());
app.post("/register", [validate_register], register);

app.post("/login", (req, res) => {
  res.send("Login");
});

app.get("/profile", get_user);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
