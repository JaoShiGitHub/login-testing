// For Authentication

import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const auth = async (req, res) => {
  const { identifier, password } = req.body;
  const data = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    identifier,
  ]);
  const user = data.rows[0];

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.identifier,
      username: user.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Login successful",
    user: user,
  });
};

export default auth;
