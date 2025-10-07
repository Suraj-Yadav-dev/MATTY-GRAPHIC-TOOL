// server/utils/generateToken.js
import jwt from "jsonwebtoken";

/**
 * Generate a JWT token for a given user ID.
 * @param {string} userId - MongoDB user ID
 * @returns {string} - Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;
