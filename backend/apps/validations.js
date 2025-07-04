// Validation for register endpoint
function validate_register(req, res, next) {
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
  next();
}

export { validate_register };
