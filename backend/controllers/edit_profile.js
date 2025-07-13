import { pool } from "../utils/db.js";

const edit_profile = async (req, res) => {
  const { username, email, status, image } = req.body;
  const { id } = req.query;
  const imageBuffer = Buffer.from(image.split(",")[1], "base64");

  try {
    await pool.query(
      `UPDATE users SET username = $1, email = $2, status = $3, photo = $4 WHERE id = $5`,
      [username, email, status, imageBuffer, id]
    );

    return res.status(200).json({ message: "Profile has been updated." });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default edit_profile;
