import { pool } from "../utils/db.js";

const get_user = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    const user_data = user.rows[0];

    if (!user_data) {
      return res.status(404).json({
        status: "error",
        message: `Not found user id: ${customer_id}`,
      });
    } else {
      return res.status(200).json({
        message: "User fetched successfully",
        user_data: user_data,
      });
    }
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
