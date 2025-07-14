import { pool } from "../utils/db.js";
// import { readFile } from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { username, email, status, image } = req.body;
  const user = { password: req.body.password };
  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);

  // const imagePath = path.join(process.cwd(), "lili2.jpg");
  // console.log("Looking for image at:", imagePath);
  // const imageBuffer = await readFile(imagePath);

  const imageBuffer = Buffer.from(image.split(",")[1], "base64");

  try {
    await pool.query(
      `INSERT INTO users (username, email, password, status, photo) VALUES ($1, $2, $3, $4, $5)`,
      [username, email, password, status, imageBuffer]
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
