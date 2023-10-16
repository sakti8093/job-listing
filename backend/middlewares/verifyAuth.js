const jwt = require("jsonwebtoken");
const verifyAuth = (req, res, next) => {
  try {
    const jwtToken = req.headers.token;
    if (!jwtToken) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(decoded, "decoded");
    if (!decoded) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: "something went wrong please try again",
    });
  }
};
module.exports = verifyAuth;
