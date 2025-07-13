import { pool } from "../utils/db.js";

const delete_account = async (req, res) => {
  const { id } = req.query;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.json({ error: "Something went wrong" });
  }
};

export default delete_account;
