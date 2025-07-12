import { pool } from "../utils/db.js";

const edit_profile = async (req, res) => {
  const { username, email, status } = req.body;
  const { id } = req.query;

  try {
    await pool.query(
      `UPDATE users SET username = $1, email = $2, status = $3 WHERE id = $4`,
      [username, email, status, id]
    );

    return req.status(200).jason({ message: "Profile has been updated." });
  } catch (error) {
    return res.jason({ error: error });
  }
};

export default edit_profile;
