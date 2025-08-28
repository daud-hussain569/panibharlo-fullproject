// backend/routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected and restricted to admin/superadmin
router.use(protect);
router.use(restrictTo("admin","superadmin"));

// GET /api/users - get all users
router.get("/", getUsers);

// GET /api/users/:id - get single user
router.get("/:id", getUserById);

// PUT /api/users/:id - update user
router.put("/:id", updateUser);

// DELETE /api/users/:id - delete user
router.delete("/:id", deleteUser);

export default router;
