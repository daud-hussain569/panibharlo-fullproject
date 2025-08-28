// backend/routes/authRoutes.js
import express from "express";
import { login, register, googleLogin } from "../controllers/authController.js";

const router = express.Router();

// Admin / User login
router.post("/login", login);

// Customer registration (optional)
router.post("/register", register);

// Deliverer login via Google OAuth
router.post("/google", googleLogin);

export default router;
