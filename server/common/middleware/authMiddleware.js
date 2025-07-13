const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");
const { Unauthorized, Forbidden } = require("../../common/util/response");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return Unauthorized(res, { message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    return Unauthorized(res, { message: "Invalid token", error });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role)
      return Forbidden(res, { message: "Access denied" });
    next();
  };
};

module.exports = {
  protect,
  requireRole,
};
