// backend/routes/authRoutes.js
import express from "express";
import { login, register, googleLogin, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin / User login
router.post("/login", login);

// Customer registration
router.post("/register", register);

// Deliverer login via Google OAuth
router.get("/google", googleLogin);

// Get current logged-in user
router.get("/me", protect, getMe);

export default router;
