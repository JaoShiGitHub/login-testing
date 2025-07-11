import { pool } from "../utils/db.js";

// Validation for register endpoint
async function validate_register(req, res, next) {
  const requiredFields = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1) //   "U" + "sername" = "Username"
        } is required!`,
      });
    } else if (field.toLowerCase() === "username" && value.length > 30) {
      return res.status(400).json({
        message: "Username must be less than 30 characters!",
      });
    }
  }

  if (requiredFields.username) {
    const data = await pool.query(`SELECT * FROM users WHERE username = $1`, [
      requiredFields.username,
    ]);

    if (data.rows[0]) {
      return res.status(400).json({ data: "The username has been taken." });
    }
  }

  next();
}

export { validate_register };
