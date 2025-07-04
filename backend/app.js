import express from "express";
import register from "./controllers/register.js";
import { validate_register } from "./apps/validations.js";
const app = express();
const port = 4000;

app.use(express.json());
app.post("/register", [validate_register], register);

app.post("/login", (req, res) => {
  res.send("Login");
});

app.get("/profile", (req, res) => {
  res.send("Profile");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
