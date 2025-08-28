// backend/controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc   Get all users
// @route  GET /api/users
// @access Admin / Super Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// @desc   Get single user by ID
// @route  GET /api/users/:id
// @access Admin / Super Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.json(user);
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Admin / Super Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Admin / Super Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
