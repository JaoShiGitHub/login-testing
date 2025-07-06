import jwt from "jsonwebtoken";

// This middleware checks if the user is authenticated by verifying the JWT token stored in cookies.
const authMiddleware = (req, res, next) => {
  const { token } = req.cookies; // This line is used to retrieve a JWT (JSON Web Token) stored in a cookie

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized. Try login again" });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded_token;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
