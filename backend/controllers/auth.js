// For Authentication
const auth = (req, res, next) => {
  console.log("Authentication middleware");
  next();
};

export default auth;
