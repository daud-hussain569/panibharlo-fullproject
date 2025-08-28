// backend/controllers/authController.js
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

// JWT generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc   Login Admin / Super Admin / User
// @route  POST /api/auth/login
// @access Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(user && user.password && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Deliverer login via Google OAuth
// @route  POST /api/auth/google
// @access Public
export const googleLogin = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;  // token from Google frontend
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const { email, name, sub: googleId } = ticket.getPayload();

  let user = await User.findOne({ googleId });
  
  if(!user) {
    user = await User.create({
      name,
      email,
      googleId,
      role: "deliverer"
    });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
});

// @desc   Register new customer (optional)
// @route  POST /api/auth/register
// @access Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role: "user" });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
