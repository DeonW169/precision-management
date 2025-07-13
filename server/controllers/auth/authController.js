const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");
const {
  BadRequest,
  Created,
  InternalServerError,
  Ok,
  Unauthorized,
} = require("../../common/util/response");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

const generateToken = (userId) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

const register = async (req, res) => {
  try {
    const { name, email, password, surname } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return BadRequest(res, { message: "User already exists" });

    const user = await User.create({ name, email, password, surname });

    const token = generateToken(user.id);
    const refresh = generateRefreshToken(user.id);

    Created(res, { user, token, refresh });
  } catch (err) {
    return InternalServerError(res, { error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return Unauthorized(res, { message: "Invalid credentials" });

    const token = generateToken(user.id);
    const refresh = generateRefreshToken(user.id);

    Ok(res, { user, token, refresh });
  } catch {
    return InternalServerError(res, { error: "Login failed" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

    const newAccessToken = generateToken(decoded.userId);
    Ok(res, { token: newAccessToken });
  } catch {
    return Unauthorized(res, { message: "Invalid refresh token" });
  }
};

const getCurrentUser = async (req, res) => {
  Ok(res, []);
};

module.exports = {
  register,
  login,
  refreshToken,
  getCurrentUser,
};
