// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Sign JWT with userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Store token in HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only secure in prod
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token; // ✅ return it so frontend can also store in localStorage if needed
};

export default generateToken;
