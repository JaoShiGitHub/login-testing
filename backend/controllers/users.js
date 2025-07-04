import { pool } from "../utils/db.js";

const get_user = async (req, res) => {
  const { customer_id } = req.query;

  try {
    const user_info = await pool.query("SELECT * FROM users WHERE id = $1", [
      customer_id,
    ]);
    return res.status(200).json({
      message: "User fetched successfully",
      user_data: user_info.rows[0],
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({
      status: "error",
      message: "Error fetching user",
      error: error.message,
    });
  }
};

export default get_user;
