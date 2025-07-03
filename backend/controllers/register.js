import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { username, email, status } = req.body;
  const user = { password: req.body.password };
  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);

  try {
    await pool.query(
      `INSERT INTO users (username, email, password, status) VALUES ($1, $2, $3, $4)`,
      [username, email, password, status]
    );
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error registering user",
      error: error.message,
    });
  }
};

export default register;
