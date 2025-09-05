import express from "express";
const router = express.Router();
import { getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// This route should be protected and only accessible by admins
router.route("/").get(protect, admin, getUsers);

export default router;